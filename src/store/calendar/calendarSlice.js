import { createSlice } from '@reduxjs/toolkit';



export const calendarSlice = createSlice({
    name: 'calendar',

    initialState: {
        isLoadingEvents: true,
        events: [



        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(el => {
                if (el.id == payload.id) {
                    return payload;
                }
                return el;
            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(el => el.id !== state.activeEvent.id);
                state.activeEvent = null;
            }

        },
        onLoadEvents: (state, { payload = [] }) => {
            state.onLoadEvents = false
            payload.forEach(event => {
                const exist = state.events.some(dbEvents => dbEvents.id == event.id);
                if(!exist){
                    state.events.push(event)
                }  
            });
        },
        onLogoutCalendar: (state)=>{
            state.isLoadingEvents = true,
            state.events = [],
            state.activeEvent = null
        }
    },

})
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions