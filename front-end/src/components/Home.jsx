import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body className="text-center">
              <Card.Title>StayHealth</Card.Title>
              <Card.Text>
                Calculate your daily caloric need in one minute
              </Card.Text>
              <Button variant="success" href="./login">
                Login
              </Button>
              <Button className="ms-4" variant="primary" href="./register">
                Register
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Home;
