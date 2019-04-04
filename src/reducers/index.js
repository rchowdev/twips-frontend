const initialState = {
    clips: [],
    playlist: []
}

const playlistReducer = (state = initialState, action) => {
  const { playlist } = state
  switch (action.type) {
    case "LOAD_CLIPS":
      return { ...state, clips: action.payload }
    case "ADD_TO_PLAYLIST":
      return { ...state, playlist: [...playlist, action.payload] }
    default:
      return state
  }
}

export default playlistReducer
