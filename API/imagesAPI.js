import HttpService from './httpService';

class ImagesAPI {
	url = 'https://picsum.photos/v2/list';

	search(page, limit) {
		const options = {
			method: 'GET',
			url: this.url,
			params: { page: page, limit: limit }
		};
		return HttpService.get(options);
	}
}

export default new ImagesAPI();
