import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FetchUser } from "../hooks/FetchUser";

const Dashboard = () => {
  const [username, setUsername] = useState();
  const [errMessage, setErrMessage] = useState();

  const fetchUser = async () => {
    const user = await FetchUser();
    if (user.errMessage) {
      setErrMessage(errMessage);
    } else {
      setUsername(user.username);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {errMessage ? errMessage : <h2>{username}</h2>}
    </>
  );
};

export default Dashboard;
