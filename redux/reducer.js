const initialState = {
  isLoggedIn: false,
}

export default function reducer(state=initialState, action){
  switch(action.type){
    case "login/status":
      return { ...state, isLoggedIn: action.payload }
    default:
      return state;
  }
}