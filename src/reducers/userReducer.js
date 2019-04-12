const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.payload.user
    case "LOG_OUT":
      return {}
    default:
      return state;
  }
}

export default userReducer
