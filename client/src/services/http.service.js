import axios from "axios";
import configFile from "../config.json";
import { toast } from "react-toastify";

const http = axios.create({
	baseURL: configFile.apiEndpoint,
});

function transformData(data) {
	return data && !data._id
		? Object.keys(data).map((key) => ({
				...data[key],
        }))
		: data;
}

http.interceptors.response.use(
	(res) => {
		if (configFile.isFireBase) {
			res.data = { content: transformData(res.data) };
		}
		res.data = { content: res.data };
		return res;
	},
	function (error) {
		const expectedErrors =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expectedErrors) {
			toast.error("Something was wrong. Try it later", {
				autoClose: 2000,
			});
		}
		return Promise.reject(error);
	}
);
const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
};
export default httpService;
