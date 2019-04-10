const initialState = {
    selectedPlaylist: {
      name: "",
      clips: [],
      areSearchResults: true  //Different behaviors if clips are search results from twitch API vs from our rails backend
    },
    playlists: [],
}

const playlistReducer = (state = initialState, action) => {
  const { playlists } = state
  switch (action.type) {
    case "LOAD_CLIPS":
      return ({
        ...state,
        selectedPlaylist: {
          name: action.payload.category,
          clips: action.payload.clips,
          areSearchResults: true
        }
      })
    case "LOAD_PLAYLISTS":
      return ({
        ...state,
        playlists: action.payload
      })
    case "ADD_TO_PLAYLIST":
      console.log("Added to playlist")
      return state
    case "REMOVE_FROM_PLAYLIST":
      return state.selectedPlaylist.areSearchResults ? //If they are not search results we remove clip from playlist clips to rerender
        state
        : ({
          ...state,
          selectedPlaylist: {
            ...state.selectedPlaylist,
            clips: state.selectedPlaylist.clips.filter(({ id }) => action.payload.id !== id)
          }
        })
    case "CREATE_PLAYLIST":
      return ({
        ...state,
        playlists: [action.payload, ...playlists]
      })
    case "MODIFY_PLAYLIST":
      const filteredPlaylists = state.playlists.filter(playlist => playlist.id !== action.payload.id)
      return ({
        selectedPlaylist: {
          ...state.selectedPlaylist,
          name: action.payload.name
        },
        playlists: [action.payload, ...filteredPlaylists]
      })
    case "REMOVE_PLAYLIST":
      return ({
        ...state,
        playlists: state.playlists.filter(playlist => playlist.id !== action.payload.id)
      })
    case "SELECT_PLAYLIST":
      return ({
        ...state,
        selectedPlaylist: { ...action.payload, areSearchResults: false }
      })
    default:
      return state
  }
}

export default playlistReducer
