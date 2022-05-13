import HttpService from './httpService';

class PostsAPI {
	url = 'https://api.spaceflightnewsapi.net/v3/articles';

	search(start, limit) {
		const options = {
			method: 'GET',
			url: this.url,
			params: { _start: start, _limit: limit }
		};
		return HttpService.get(options);
	}

	getPost(id) {
		const options = {
			method: 'GET',
			url: this.url,
			params: { id: id }
		};
		return HttpService.get(options);
	}
}

export default new PostsAPI();
