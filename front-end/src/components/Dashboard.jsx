import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Card, Col, Container, Row } from "react-bootstrap";
import "../assets/Dashboard.css";

const Dashboard = () => {
  const userDto = useSelector((state) => state.userDto);

  useEffect(() => {
    console.log(userDto);
  }, []);

  return (
    <>
      <Container className="mt-4 bg-light">
        <Row>
          <Col xs={12}>
            <span className="total-calories">{userDto.dailyCaloricNeeds}</span>
            <span className="fs-1"> Kcal</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>My Daily Caloric Need 😊</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <span>My ideal Weight: </span>
            <span className="weight">{userDto.idealWeight} Kg</span>
          </Col>
          <Col>
            <span>My actual Weight: </span>
            <span className="weight">{userDto.weightKg} Kg</span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
