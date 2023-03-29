import { useDispatch, useSelector } from "react-redux"
import {  onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = ()=>{

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar)
    
    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent)=>{
        if(calendarEvent._id){
            //update event
            dispatch(onUpdateEvent({...calendarEvent}))
        }
        else{
            //create new event
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()})) //add new event with id
        }
    }

    const startDeletingEvent = ()=>{
        dispatch(onDeleteEvent())
    }
    return{
        startDeletingEvent,
        events,
        activeEvent,
        setActiveEvent,
        startSavingEvent,
        hasEventSelected: !!activeEvent, //if is null return false, else if have event return true
    }
}