const initialState = {
    clips: []
}

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CLIPS":
      return {...state, clips: action.payload}
    default:
      return state
  }
}

export default playlistReducer
