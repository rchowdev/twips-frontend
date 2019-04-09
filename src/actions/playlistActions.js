import { API_URL, API_HEADERS, TWITCH_HEADERS } from '../constants'

//Action creator
const loadClips = (clips) => ({ type: 'LOAD_CLIPS', payload: clips })
const loadPlaylists = (playlists) => ({ type: 'LOAD_PLAYLISTS', payload: playlists })
const addToPlaylist = (clip) => ({ type: 'ADD_TO_PLAYLIST', payload: clip })
const createPlaylist = (playlist) => ({ type: 'CREATE_PLAYLIST', payload: playlist })
const selectPlaylist = (playlist) => ({ type: 'SELECT_PLAYLIST', payload: playlist })
const removeFromPlaylist = (deletedClip) => ({ type: 'REMOVE_FROM_PLAYLIST', payload: deletedClip })
const modifyPlaylist = playlist => ({ type: 'MODIFY_PLAYLIST', payload: playlist })
const removePlaylist = playlist => ({ type: 'REMOVE_PLAYLIST', payload: playlist })

//Thunks
//Get top clips from twitch api
export const getTopClips = () => (dispatch) => {
  return fetch("https://api.twitch.tv/kraken/clips/top?limit=12", { headers: TWITCH_HEADERS })
    .then(res => res.json())
    .then(json => dispatch(loadClips(formatClips(json.clips))))
}

//Get user's playlists
export const getPlaylists = () => (dispatch) => {
  return fetch(`${API_URL}/playlists`, {
    method: "GET",
    headers: API_HEADERS,
  })
    .then(res => res.json())
    .then(playlists => playlists.error ? console.log(playlists.error) : dispatch(loadPlaylists(playlists)))
}

//Post to clip backend and add to current user's playlist
//We can do find or create playlist if playlist doesn't exist in backend and pass back a playlist with clip with serializer
export const postClip = (playlistID, clip) => (dispatch) => {
  const { title, thumbnail, broadcaster, twitch_tr_id } = clip
  const fetchBody = {
    clip: {
      title,
      thumbnail,
      broadcaster,
      twitch_tr_id //Used to identify clip
    }
  }
  return fetch(`${API_URL}/playlists/${playlistID}/clips`, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify(fetchBody)
  })
    .then(res => res.json())
    .then(clip =>  clip.error ? console.log(clip.error) : dispatch(addToPlaylist(clip)))
}

//Delete clip
export const deleteClip = (playlistID, clipID) => (dispatch) => {
  return fetch(`${API_URL}/playlists/${playlistID}/clips/${clipID}`, {
    method: "DELETE",
    headers: API_HEADERS,
  })
    .then(res => res.json())
    .then(clip => clip.error ? console.log(clip.error) : dispatch(removeFromPlaylist(clip)))
}

//Create playlist and receive a playlist object with id and name
export const postPlaylist = (playlist) => (dispatch) => {
  return fetch(`${API_URL}/playlists`, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify({
      playlist: playlist
    })
  })
    .then(res => res.json())
    .then(playlist => playlist.error ? console.log(playlist.error) : dispatch(createPlaylist(playlist)))
}

//Update Playlist
export const updatePlaylist = (playlistID, name) => (dispatch) => {
  return fetch(`${API_URL}/playlists/${playlistID}`, {
    method: "PATCH",
    headers: API_HEADERS,
    body: JSON.stringify({
      name: name
    })
  })
    .then(res => res.json())
    .then(playlist => dispatch(modifyPlaylist(playlist)))
}

//Delete Playlist
export const deletePlaylist = (playlistID) => (dispatch) => {
  return fetch(`${API_URL}/playlists/${playlistID}`, {
    method: "DELETE",
    headers: API_HEADERS
  })
    .then(res => res.json())
    .then(playlist => dispatch(removePlaylist(playlist)))
}

//Get specific playlist and receive object with playlist and its clips
export const getClips = (playlistID) => (dispatch) => {
  return fetch(`${API_URL}/playlists/${playlistID}/clips`, {
    method: "GET",
    headers: API_HEADERS
  })
    .then(res => res.json())
    .then(playlist => playlist.error ? console.log(playlist.error) : dispatch(selectPlaylist(playlist)))
}


//Helpers

const formatClips = (clips) => {
  //Destructure the JSON data
  return clips.map(({ title, broadcaster, thumbnails, tracking_id }) => ({
      title,
      twitch_tr_id: tracking_id,
      thumbnail: thumbnails.medium,
      broadcaster: broadcaster.display_name
    })
  )
}
