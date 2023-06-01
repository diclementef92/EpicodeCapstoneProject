const BASEURL = `http://localhost:${
  process.env.REACT_APP_SERVER_PORT ? process.env.REACT_APP_SERVER_PORT : 8080
}/api/users/`;

export const FetchUser = async (username) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        console.log("Error getting user data,  status code: ", response.status);

        return {
          errMessage:
            "Error getting user data,  status code: " + response.status,
        };
      }

      const data = await response.json();
      console.log(data);

      // return user data
      return data;
      //
    } catch (error) {
      console.log("Error getting user data: Error in getUserData fetch", error);
      return {
        errMessage: "Error getting user data: Error in getUserData fetch",
      };
    }
  } else {
    return { errMessage: "user not logged in" };
  }
};

export const UpdateUser = async (username, userToUpdateDTO) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + username, {
        method: "PUT",
        body: JSON.stringify(userToUpdateDTO),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Error updating user,  status code: ", response.status);
        return {
          errMessage: "Error updating user: " + data.message,
        };
      }

      console.log(data);

      // return user data
      return data;
      //
    } catch (error) {
      console.log("Error updating user: Error in UpdateUser fetch", error);
      return {
        errMessage: "Error updating user: Error in UpdateUser fetch",
      };
    }
  } else {
    return { errMessage: "user not logged in" };
  }
};
