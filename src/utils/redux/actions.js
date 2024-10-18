// actions.js
export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const initiateUsers = (users) => {
  return {
    type: "INITIATE_USERS",
    payload: users,
  };
};

export const updateUser = (email, updatedUser) => {
  return {
    type: "UPDATE_USER",
    payload: { email, updatedUser },
  };
};

export const deleteUser = (email) => {
  return {
    type: "DELETE_USER",
    payload: email,
  };
};
