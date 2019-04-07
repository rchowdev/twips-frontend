const initialState = {
  selectedClip: {}
}

const clipReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_CLIP":
      return { selectedClip: action.payload }
    default:
      return state
  }
}

export default clipReducer
