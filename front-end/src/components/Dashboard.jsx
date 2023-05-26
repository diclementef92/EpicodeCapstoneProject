import { useEffect, useState } from "react";
import { Button, Card, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FetchUser } from "../hooks/FetchUser";
import { useSelector } from "react-redux";
import DailyCalories from "./DailyCalories";

const Dashboard = () => {
  const userDto = useSelector((state) => state.userDto);
  const [errMessage, setErrMessage] = useState();

  useEffect(() => {
    console.log(userDto);
  }, []);

  return (
    <Container className="d-flex justify-content-sm-center mt-4">
      {errMessage ? (
        <Card style={{ width: "18rem" }} className="text-center">
          <Card.Body>
            <Card.Title>{errMessage}</Card.Title>
            <Card.Text>Try to Login again</Card.Text>
            <Button href={"../login"}>Login</Button>
          </Card.Body>
        </Card>
      ) : (
        <DailyCalories dailyCaloricNeeds={userDto.dailyCaloricNeeds} />
      )}
    </Container>
  );
};

export default Dashboard;
