import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, Col, Container, Row } from "react-bootstrap";
import "../assets/Dashboard.css";
import { FetchWeightsByUsernameOrderedByDateAsc } from "../hooks/FetchWeights";

const Dashboard = () => {
  const userDto = useSelector((state) => state.userDto);
  const [recentWeight, setRecentWeight] = useState(0);

  useEffect(() => {
    console.log(userDto);
    retriveRecentWeight();
  }, []);

  const retriveRecentWeight = async () => {
    const res = await FetchWeightsByUsernameOrderedByDateAsc(userDto.username);
    if (res) {
      setRecentWeight(res[res.length - 1].weight);
    }
  };

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
            <span className="weight">{recentWeight} Kg</span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
