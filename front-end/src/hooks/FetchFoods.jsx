const BASEURL = `http://localhost:${
  process.env.REACT_APP_SERVER_PORT ? process.env.REACT_APP_SERVER_PORT : 8080
}/api/foods`;

export const FetchFoods = async (value) => {
  if (localStorage.getItem("token")) {
    try {
      const response = await fetch(BASEURL + "?descr=" + value, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("Error getting foods data,  status:", response.status);

        return {
          errMessage: "Error getting foods data",
        };
      }

      const data = await response.json();
      console.log(data);

      // return user data
      return data.slice(0, 10);
      //
    } catch (error) {
      console.log("Error getting foods data: Error in FetchFoods ", error);
      return {
        errMessage: "Error getting foods data",
      };
    }
  } else {
    return { errMessage: "User not logged in" };
  }
};
