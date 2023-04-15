import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onCheking, onLogin, onLogout, onLogoutCalendar } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);


    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onCheking());
        try {

            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-data', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Las credenciales son incorrectas'));

            setTimeout(() => {
                clearErrorMessage();
            }, 10);
        }

    }

    const startRegister = async ({name, email, password}) => {
        dispatch(onCheking());

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-data', new Date().getTime());

            dispatch(onLogin({name: data.name, uid: data.uid} ));

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || "--"));

            setTimeout(() => {
                clearErrorMessage();
            }, 10);
        }
    }

    const checkOutToken = async()=>{

        const token = localStorage.getItem('token');
        if(!token){
           return dispatch(onLogout());
        }
        try {
            const { data } = await calendarApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-data', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid} ));

        } catch (error) {
            
            localStorage.clear();
            dispatch(onLogout());
            
        }

    }

    const startLogout = ()=>{
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());

    }

    return {
        status,
        user,
        errorMessage,
        //method
        startLogin,
        startRegister,
        checkOutToken,
        startLogout
    }
}