import { API_URL, API_HEADERS } from '../constants'

//Action Creators
const logIn = (user) => {
  console.log('This is the value of user:', user)
  return ({ type: "LOG_IN", payload: user })
}

export const logOut = () => {
  return ({ type: "LOG_OUT" })
}

//Thunks
//Create new user
export const postUser = (userData) => (dispatch) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: API_HEADERS,
    body: JSON.stringify({ user: userData })
  })
    .then(res => res.json())
    .then(userData => { localStorage.setItem('token', userData.jwt); dispatch(logIn(userData)) })
}
