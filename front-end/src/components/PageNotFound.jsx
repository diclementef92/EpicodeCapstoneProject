import { useEffect } from "react";
import { Link } from "react-router-dom";
import Home from "./Home";

const PageNotFound = () => {
  useEffect(() => {}, []);

  return (
    <>
      <h1>Page Not Found</h1>
      <Link to={"/"}>Go to Home</Link>
    </>
  );
};

export default PageNotFound;
