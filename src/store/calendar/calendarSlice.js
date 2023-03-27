import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {

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
        increment: (state, /* action */) => {
            state.value += 1
        },
    },
})
export const { increment } = calendarSlice.actions