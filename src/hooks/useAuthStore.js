import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onCheking, onLogin, onLogout } from "../store";


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

            
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || "--"));

            setTimeout(() => {
                clearErrorMessage();
            }, 10);
        }
    }

    return {
        status,
        user,
        errorMessage,
        //method
        startLogin,
        startRegister
    }
}