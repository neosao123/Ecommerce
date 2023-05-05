export default function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGGD_IN_USER":
      return action.payload;
    case "LOGOUT":  
      return action.payload;
    default:
      return state;
  }
}
