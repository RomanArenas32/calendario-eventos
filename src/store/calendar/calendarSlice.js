import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: "Nota de Prueba",
    notes: "Nota sobre la prueba",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
        id: 123,
        name: "Roman",
    },

}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload})=>{
            state.activeEvent = payload
        },
        onAddNewEvent: (state, {payload})=>{
            state.events.push(payload);
            state.activeEvent = null;
        }
    },
})
export const { onSetActiveEvent } = calendarSlice.actions