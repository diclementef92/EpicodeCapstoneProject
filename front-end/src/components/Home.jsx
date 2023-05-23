import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {}, []);

  return (
    <>
      <h1>Homepage</h1>

      <Link to={"/register"}>SignUp</Link>
      <br />
      <Link to={"/login"}>Login</Link>
    </>
  );
};

export default Home;
