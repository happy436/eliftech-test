import { createSlice } from "@reduxjs/toolkit";
import participantsService from "../services/participants.services";

const participantsSlice = createSlice({
	name: "participants",
	initialState: {
		entities: [],
		isLoading: true,
		error: null,
	},
	reducers: {
		participantsRequested: (state) => {
			state.isLoading = true;
		},
		participantsReceived: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		participantsRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: participantsReducer, actions } = participantsSlice;
const {
	participantsRequested,
	participantsReceived,
	participantsRequestFailed,
} = actions;

export const loadParticipantsList = (eventId) => async (dispatch) => {
	dispatch(participantsRequested());
	try {
		const { content } = await participantsService.getParticipants(eventId);
		dispatch(participantsReceived(content));
	} catch (error) {
		dispatch(participantsRequestFailed(error.message));
	}
};

export const registration = (eventId, data) => async (dispatch) => {
	dispatch(participantsRequested());
	try {
		/* const { content } = await habitsService.getHabits(userId); */
		participantsService.signUp(eventId, data);
	} catch (error) {
		dispatch(participantsRequestFailed(error.message));
	}
};

export const getParticipants = () => (state) => state.participants.entities;
export const getParticipantsLoadingStatus = () => (state) =>
	state.participants.isLoading;

export default participantsReducer;
