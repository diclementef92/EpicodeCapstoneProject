import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FetchFoods } from "../hooks/FetchFoods";

const Foods = () => {
  const userDto = useSelector((state) => state.userDto);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    console.log(userDto);
  }, []);

  const handleChange = async (e) => {
    const foods = await FetchFoods(e.target.value);
    setFoods(foods);
  };

  return (
    <Container className="mt-2">
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
    </Container>
  );
};

export default Foods;
