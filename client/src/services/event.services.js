import httpService from "./http.service";
const eventsEndpoint = "events/";

const eventsService = {
	createEvents: async (payload) => {
		const { data } = await httpService.post(eventsEndpoint, payload);
		return data;
	},
	getEvents: async () => {
		const { data } = await httpService.get(eventsEndpoint);
		return data;
	},
	getEventById: async (eventId) => {
		const url = `${eventsEndpoint}/${eventId}`;
		const { data } = await httpService.get(url);
		return data;
	},
};
export default eventsService;
