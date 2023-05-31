const BASEURL = `http://localhost:${
  process.env.REACT_APP_SERVER_PORT ? process.env.REACT_APP_SERVER_PORT : 8080
}/api/weights/`;

export const FetchWeightsByUsernameOrderedByDateAsc = async (username) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + "ordered-by-date/" + username, {
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

export const AddWeightForUsername = async (username, weight) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + "user/" + username, {
        method: "POST",
        body: JSON.stringify(weight),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        console.log("Error adding weight,  status", response.status);

        return {
          errMessage: "Error adding weight,  status code: " + response.status,
        };
      }

      const data = await response.json();
      console.log(data);

      // return user data
      return data;
      //
    } catch (error) {
      console.log(
        "Error adding weight: Error in UpdateWeightById fetch",
        error
      );
      return {
        errMessage: "Error adding weight",
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
      });
      if (!response.ok) {
        console.log("Error updating weight,  status code: ", response.status);

        return {
          errMessage: "Error updating weight",
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
export const DeleteWeightById = async (weight_id) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + weight_id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        console.log("Error deleting weight,  status code: ", response.status);

        return {
          errMessage: "Error deleting weight",
        };
      }

      const data = await response.text();
      console.log(data);

      // return user data
      return data;
      //
    } catch (error) {
      console.log(
        "Error deleting weight: Error in DeleteWeightById fetch",
        error
      );
      return {
        errMessage: "Error deleting weight",
      };
    }
  } else {
    return { errMessage: "User not logged in" };
  }
};
