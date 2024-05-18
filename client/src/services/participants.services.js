import httpService from "./http.service";
const participantsEndpoint = "participants/";

const participantsService = {
	signUp: async (eventId, payload) => {
        const url = `${participantsEndpoint}/${eventId}`;
		const { data } = await httpService.patch(url, payload);
		return data;
	},
	getParticipants: async (eventId) => {
        const url = `${participantsEndpoint}/${eventId}`;
		const { data } = await httpService.get(url);
		return data;
	},
};
export default participantsService;
