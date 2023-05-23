import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = ({ username }) => {
  useEffect(() => {}, []);

  return (
    <>
      <h1>Dashboard</h1>
      <h2>{username}</h2>
    </>
  );
};

export default Dashboard;
