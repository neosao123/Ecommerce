import axios  from "axios";

export const createOrUpdateUser = async (authhToken) => {
    return await axios.get(
      "http://127.0.0.1:2001/create-update-user",
      {
        headers: {
          token: authhToken,
        },
      }
    );  
  };



export const currentUser = async (authhToken) => {
  return await axios.get(
    "http://127.0.0.1:2001/user-current",
    {
      headers: {
        token: authhToken,
      },
    }
  );  
};



export const currentAdmin = async (authhToken) => {
  return await axios.get(
    "http://127.0.0.1:2001/admin-current",
    {
      headers: {
        token: authhToken,
      },
    }
  );  
};