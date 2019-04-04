const API_URL = "http://localhost:3001/api/v1"
const CLIENT_ID = "1ulzeyfog8sg4jobbpcq9n48gyw91i"  //Move this out in production
const TWITCH_HEADERS = {
  "Accept": "application/vnd.twitchtv.v5+json",
  "Client-ID": CLIENT_ID
}
const API_HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}


//Action creator
const loadClips = (clips) => ({ type: 'LOAD_CLIPS', payload: clips})
const addToPlaylist = (clip) => ({ type: 'ADD_TO_PLAYLIST', payload: clip })

//Get top clips from twitch api
export const getTopClips = () => (dispatch) => {
  return fetch("https://api.twitch.tv/kraken/clips/top?limit=9", { headers: TWITCH_HEADERS })
    .then(res => res.json())
    .then(json => dispatch(loadClips(json.clips)))
}

//Post to clip backend and add to current user's playlist
export const postClip = (clip) => (dispatch) => {
  const { title, thumbnails, broadcaster, tracking_id } = clip
  const fetchBody = {
    clip: {
      title: title,
      thumbnail: thumbnails.medium,
      broadcaster: broadcaster.display_name,
      twitch_tr_id: tracking_id //Used to identify clip
    }
  }
  return fetch(`${API_URL}/playlists/1/clips`, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify(fetchBody)
  })
    .then(res => res.json())
    .then(clip =>  clip.error ? console.log(clip.error) : dispatch(addToPlaylist(clip)))
}
