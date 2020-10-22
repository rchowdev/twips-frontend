// export const API_URL = "https://twips-backend-v2.herokuapp.com/api/v2";
export const API_URL = "http://localhost:5000/api/v2";
export const TWITCH_API = "https://api.twitch.tv/kraken";
export const TWITCH_HEADERS = {
	Accept: "application/vnd.twitchtv.v5+json",
	"Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
};
export const API_HEADERS = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

//Has to be a function because we want to dynamically get token. If it was an object, token will be assigned only once to null.
export const AUTH_HEADERS = () => {
	return {
		...API_HEADERS,
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	};
};
