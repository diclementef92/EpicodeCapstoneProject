import { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FetchFoods } from "../hooks/FetchFoods";
import { Link } from "react-router-dom";

const Foods = () => {
  const userDto = useSelector((state) => state.userDto);
  const [loggedIn, setLoggedIn] = useState(false);

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (userDto.username) setLoggedIn(true);
  }, []);

  const handleChange = async (e) => {
    if (e.target.value) {
      const foods = await FetchFoods(e.target.value);
      setFoods(foods);
    } else setFoods([]);
  };

  return (
    <>
      <Container className="mt-4">
        {!loggedIn ? (
          <Alert variant="danger">
            User not logged in <Link to={"/login"}>Sign in</Link>
          </Alert>
        ) : (
          <>
            <Row className="mt-4">
              <Col></Col>
              <Col xs={6}>
                <Form.Control
                  type="text"
                  placeholder="search for foods"
                  onChange={(e) => handleChange(e)}
                ></Form.Control>
              </Col>
              <Col></Col>
            </Row>

            <Row className="mt-4 mx-4">
              <Col></Col>

              <Col xs={6}>
                {foods?.map((x, i) => (
                  <Row key={"food-" + i} className="bg-light">
                    <Col xs={6}>{x.description}</Col>
                    <Col xs={6}>{x.kcal} Kcal</Col>
                  </Row>
                ))}
              </Col>
              <Col></Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Foods;
