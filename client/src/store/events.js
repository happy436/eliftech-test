import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
import eventsService from "../services/event.services";

const mockData = [
	{
		_id: "event1",
		title: "Okean Elzy in Berlin",
		description:
			"Concert of the legendary Ukrainian rock band Okean Elzy in Berlin.",
		date: new Date("2024-11-20").getTime(),
		organizer: "Okean Elzy",
	},
	{
		_id: "event2",
		title: "Max Barskih in Munich",
		description:
			"Concert of the popular Ukrainian pop artist Max Barskih in Munich.",
		date: new Date("2024-10-18").getTime(),
		organizer: "Max Barskih",
	},
	{
		_id: "event3",
		title: "Antitila in Cologne",
		description:
			"Performance of the famous Ukrainian band Antitila in Cologne.",
		date: new Date("2024-10-26").getTime(),
		organizer: "Antitila",
	},
	{
		_id: "event4",
		title: "DakhaBrakha in Krakow",
		description: "Concert of the ethno-chaos band DakhaBrakha in Krakow.",
		date: new Date("2024-11-25").getTime(),
		organizer: "DakhaBrakha",
	},
	{
		_id: "event5",
		title: "Bez Obmezhen in Rzeszow",
		description: "Performance of the band Bez Obmezhen in Rzeszow, Poland.",
		date: new Date("2024-11-16").getTime(),
		organizer: "Bez Obmezhen",
	},
	{
		_id: "event6",
		title: "Kristina Soloviy in Berlin",
		description:
			"Concert of the indie-pop singer Kristina Soloviy in Berlin.",
		date: new Date("2024-11-05").getTime(),
		organizer: "Kristina Soloviy",
	},
	{
		_id: "event7",
		title: "LUNA in Poznan",
		description: "Performance of LUNA in Poznan, Poland.",
		date: new Date("2024-11-22").getTime(),
		organizer: "LUNA",
	},
	{
		_id: "event8",
		title: "Poshlaya Molly in Berlin",
		description: "Concert of the pop-punk band Poshlaya Molly in Berlin.",
		date: new Date("2024-11-01").getTime(),
		organizer: "Poshlaya Molly",
	},
	{
		_id: "event9",
		title: "ONUKA in Warsaw",
		description: "Electro-pop performance of ONUKA in Warsaw.",
		date: new Date("2024-11-14").getTime(),
		organizer: "ONUKA",
	},
	{
		_id: "event10",
		title: "Nervy in Hamburg",
		description: "Concert of the band Nervy in Hamburg.",
		date: new Date("2024-11-11").getTime(),
		organizer: "Nervy",
	},
];

/* toast.success("Habit edit successful", {
			autoClose: 2000,
			position: "top-right",
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Bounce,
		}); */

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
		return state.events.entities.find((n) => n._id === id);
	}
};

export default eventsReducer;
