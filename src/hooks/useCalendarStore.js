import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const user = useSelector(state => state.auth.user);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
                //update event
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

                dispatch(onUpdateEvent({ ...calendarEvent, user }));

                return;
            }
            else {
                //create new event
                const { data } = await calendarApi.post('/events', calendarEvent);
                console.log(data)
                dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user })) //add new event with id
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar el evento, por favor reintentelo!', error.response.data.msg, 'error')
        }


    }

    const startDeletingEvent = async () => {

        try {

            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent())

        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar el evento, recuerde que solo puede ser borrado por su creador!', error.response.data.msg, 'error')
        }


    }

    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events/');

            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events))


        } catch (error) {
            console.log("Error al cargar los eventos");
            console.log(error);
        }
    }

    return {
        startDeletingEvent,
        events,
        activeEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
        hasEventSelected: !!activeEvent, //if is null return false, else if have event return true
    }
}