import { useEffect, useState } from "react";
import { Button, Card, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FetchUser } from "../hooks/FetchUser";

const Dashboard = () => {
  const [username, setUsername] = useState();
  const [errMessage, setErrMessage] = useState();

  const fetchUser = async () => {
    const user = await FetchUser();
    if (user.errMessage) {
      setErrMessage(user.errMessage);
    } else {
      setUsername(user.username);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container className="d-flex justify-content-sm-center mt-4">
      <h1>Dashboard</h1>
      {errMessage ? (
        <Card style={{ width: "18rem" }} className="text-center">
          <Card.Body>
            <Card.Title>{errMessage}</Card.Title>
            <Card.Text>Try to Login again</Card.Text>
            <Button href={"../login"}>Login</Button>
          </Card.Body>
        </Card>
      ) : (
        <h2>{username}</h2>
      )}
    </Container>
  );
};

export default Dashboard;
