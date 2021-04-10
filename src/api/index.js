const host = 'http://localhost:5000';
class userApi {
	static phoneNumberApi(phoneNumber) {
		return fetch(`${host}/phoneNumber`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(phoneNumber),
			method: 'POST',
		})
			.then((response) => response)
			.then((results) => results)
			.catch((err) => err);
	}
}

export default userApi;
