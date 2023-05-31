const AuthURL = `http://localhost:${
  process.env.REACT_APP_SERVER_PORT ? process.env.REACT_APP_SERVER_PORT : 8080
}/api/auth`;
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const SignUp = async (props) => {
  try {
    console.log(props);
    const response = await fetch(AuthURL + "/signup", {
      method: "POST",
      body: JSON.stringify({ ...props, roles: ["ROLE_USER"] }),
      headers: myHeaders,
      redirect: "follow",
    });

    if (!response.ok) {
      console.log("Authentication: Error in SignUp,  status ", response.status);
      const data = await response.json();
      console.log(data);
      return data.message;
    }

    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Authentication: Error in SignUp fetch", error);
  }
};

export const SignIn = async (props) => {
  try {
    const response = await fetch(AuthURL + "/signin", {
      method: "POST",
      body: JSON.stringify({ ...props }),
      headers: myHeaders,
      redirect: "follow",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(
        "Authentication: Error in SignIn,  status code: ",
        response.status
      );
      return { ...data, status: response.status };
    }

    // process.env.REACT_APP_MYTOKEN = data.accessToken; //save token
    // process.env.REACT_APP_MYUSERNAME = data.username; //save token
    localStorage.setItem("token", data.accessToken);

    return data; // return success string message
  } catch (error) {
    console.log("Authentication: Error in SignIn fetch", error);
  }
};
