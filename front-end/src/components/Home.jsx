import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <Row className="justify-content-sm-center mt-4">
        <Col sm="auto">
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
      </Row>
    </Container>
  );
};

export default Home;
