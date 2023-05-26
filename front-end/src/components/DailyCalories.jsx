import { useEffect, useState } from "react";
import { Button, Card, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FetchUser } from "../hooks/FetchUser";
import { useSelector } from "react-redux";

const DailyCalories = (props) => {
  const userDto = useSelector((state) => state.userDto);
  const [errMessage, setErrMessage] = useState();

  useEffect(() => {}, []);

  return (
    <Container>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Daily Caloric Need</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            <p className="dailyCaloricNeeds">{props.dailyCaloricNeeds}</p>
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DailyCalories;
