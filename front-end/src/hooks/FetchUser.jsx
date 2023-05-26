import { useDispatch } from "react-redux";

const BASEURL = "http://localhost:8080/api/users/";

export const FetchUser = async () => {
  if (localStorage.getItem("username") && localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + localStorage.getItem("username"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        redirect: "manual",
      });
      if (!response.ok) {
        console.log("Error getting user data,  status", response.status);

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
