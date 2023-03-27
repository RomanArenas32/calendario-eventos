import { useDispatch, useSelector } from "react-redux"
import { calendarSlice } from "../store";


export const useCalendarStore = ()=>{

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar)

    

    return{
        events,
        activeEvent
    }
}