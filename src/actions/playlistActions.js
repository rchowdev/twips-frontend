// const API_URL = "http://localhost:3001"
const CLIENT_ID = "1ulzeyfog8sg4jobbpcq9n48gyw91i"  //Move this out in production
const HEADERS = {
  "Accept": "application/vnd.twitchtv.v5+json",
  "Client-ID": CLIENT_ID
}

//Action creator
const loadClips = (clips) => ({ type: 'LOAD_CLIPS', payload: clips})


//Fetch top clips from twitch api
export const getTopClips = () => (dispatch) => {
    return fetch("https://api.twitch.tv/kraken/clips/top?limit=9", { headers: HEADERS })
      .then(res => res.json())
      .then(json => dispatch(loadClips(json.clips)))
}
