import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./events";
import participantsReducer from "./participants";

const rootReducer = combineReducers({
	events: eventsReducer,
    participants: participantsReducer
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}
