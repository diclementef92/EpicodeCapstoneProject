import { useDispatch, useSelector } from "react-redux";

const BASEURL = `http://localhost:${
  process.env.REACT_APP_SERVER_PORT ? process.env.REACT_APP_SERVER_PORT : 8080
}/api/weights/`;

export const FetchWeightsByUsername = async (username) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + "user/" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        console.log(
          "Error getting weight measurements,  status:",
          response.status
        );

        return {
          errMessage:
            "Error getting weight measurements,  status: " + response.status,
        };
      }

      const data = await response.json();
      console.log(data);

      // return user data
      return data;
      //
    } catch (error) {
      console.log(
        "Error getting weight measurements: Error in FetchWeightsByUsername fetch",
        error
      );
      return {
        errMessage: "Error getting weight measurements",
      };
    }
  } else {
    return { errMessage: "User not logged in" };
  }
};

export const UpdateWeightById = async (weight_id, weight) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + weight_id, {
        method: "PUT",
        body: JSON.stringify(weight),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        redirect: "manual",
      });
      if (!response.ok) {
        console.log("Error updating weight,  status", response.status);

        return {
          errMessage: "Error updating weight,  status code: " + response.status,
        };
      }

      const data = await response.json();
      console.log(data);

      // return user data
      return data;
      //
    } catch (error) {
      console.log(
        "Error updating weight: Error in UpdateWeightById fetch",
        error
      );
      return {
        errMessage: "Error updating weight",
      };
    }
  } else {
    return { errMessage: "User not logged in" };
  }
};
