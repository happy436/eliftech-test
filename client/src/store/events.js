import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
import eventsService from "../services/event.services";

const eventsSlice = createSlice({
	name: "events",
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
	},
	reducers: {
		eventsRequested: (state) => {
			state.isLoading = true;
		},
		eventsReceived: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		eventsRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: eventsReducer, actions } = eventsSlice;
const { eventsRequested, eventsReceived, eventsRequestFailed } = actions;

export const loadEventsList = () => async (dispatch) => {
	dispatch(eventsRequested());
	try {
		const { content } = await eventsService.getEvents();
		dispatch(eventsReceived(content));
	} catch (error) {
		dispatch(eventsRequestFailed(error.message));
	}
};

export const loadEventById = (eventId) => async (dispatch) => {
    dispatch(eventsRequested());
	try {
		const { content } = await eventsService.getEventById(eventId);
		dispatch(eventsReceived([content]));
	} catch (error) {
		dispatch(eventsRequestFailed(error.message));
	}
}

export const getEvents = () => (state) => state.events.entities;
export const getEventsLoadingStatus = () => (state) => state.events.isLoading;
export const getEventById = (id) => (state) => {
	if (state.events.entities) {
		return state.events.entities.find((n) => n.eventID === id);
	}
};

export default eventsReducer;
