import { useEffect } from "react";

import { Button, Card, Container } from "react-bootstrap";

const PageNotFound = () => {
  useEffect(() => {}, []);

  return (
    <Container className="d-flex justify-content-sm-center mt-4">
      <Card style={{ width: "18rem" }} className="text-center">
        <Card.Body>
          <Card.Title>Page not Found</Card.Title>
          <Card.Text>Go back to Home</Card.Text>
          <Button href={"./"}>Home</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PageNotFound;
