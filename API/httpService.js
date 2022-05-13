import axios from "axios";

class HttpService {
	async get(endpoint) {
		const result = await axios.request(endpoint);
		return result?.data ?? result;
	}
}

export default new HttpService();
