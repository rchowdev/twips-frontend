const initialState = {
    selectedPlaylist: {
      name: "",
      clips: []
    },
    playlists: [],
}

const playlistReducer = (state = initialState, action) => {
  const { playlists, selectedPlaylist } = state
  const { name, clips} = selectedPlaylist
  switch (action.type) {
    case "LOAD_CLIPS":
      return ({
        ...state,
        selectedPlaylist: {
          name: "Top Clips",
          clips: action.payload
        }
      })
    case "LOAD_PLAYLISTS":
      return ({
        ...state,
        playlists: action.payload
      })
    case "ADD_TO_PLAYLIST":
      return state
    case "CREATE_PLAYLIST":
      return ({
        ...state,
        playlists: [action.payload, ...playlists]
      })
    case "SELECT_PLAYLIST":
      return ({
        ...state,
        selectedPlaylist: action.payload
      })
    default:
      return state
  }
}

export default playlistReducer
