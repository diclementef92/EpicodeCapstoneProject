import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import "../assets/Dashboard.css";
import { FetchWeightsByUsernameOrderedByDateAsc } from "../hooks/FetchWeights";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userDto = useSelector((state) => state.userDto);
  const [recentWeight, setRecentWeight] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (userDto.username) {
      setLoggedIn(true);
      retriveRecentWeight();
    }
  }, []);

  const retriveRecentWeight = async () => {
    const res = await FetchWeightsByUsernameOrderedByDateAsc(userDto.username);
    if (res?.length > 0) {
      setRecentWeight(res[res.length - 1].weight);
    } else {
      setRecentWeight(userDto.weightKg);
    }
  };

  return (
    <>
      {!loggedIn ? (
        <Container className="mt-4">
          <Alert variant="danger">
            User not logged in <Link to={"/login"}>Sign in</Link>
          </Alert>
        </Container>
      ) : (
        <Container className="mt-4 board">
          <Row>
            <Col xs={12} sm={6}>
              <span className="total-calories">
                {userDto.dailyCaloricNeeds}
              </span>
              <span className="fs-1"> Kcal</span>
              <p>My Daily Caloric Need 😊</p>
            </Col>
            <Col xs={12} sm={6}>
              <Row>
                <Col xs={12}>
                  <span>My ideal Weight: </span>
                  <span className="weight">{userDto.idealWeight} Kg</span>
                  <br />
                  <span>My actual Weight: </span>
                  <span className="weight">{recentWeight} Kg</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
          <Row></Row>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
