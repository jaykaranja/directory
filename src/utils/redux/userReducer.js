// userReducer.js
const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIATE_USERS":
      return {
        ...state,
        users: action.payload,
      };
 
      case "ADD_USER":
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.email === action.payload.email ? action.payload.updatedUser : user
        ),
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.email !== action.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
