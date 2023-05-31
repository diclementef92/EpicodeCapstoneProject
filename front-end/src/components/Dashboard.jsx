import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Card, Container } from "react-bootstrap";
import "../assets/dashboard.css";

const Dashboard = () => {
  const userDto = useSelector((state) => state.userDto);

  useEffect(() => {
    console.log(userDto);
  }, []);

  return (
    <>
      <Container className="mt-4">
        <Card className="p-4">
          <Card.Title>
            <span className="total-calories">{userDto.dailyCaloricNeeds}</span>
            <span className="fs-1"> Kcal</span>
            <p>My Daily Caloric Need 😊</p>
          </Card.Title>
          <Card.Body></Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
