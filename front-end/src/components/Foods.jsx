import { useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Foods = () => {
  const userDto = useSelector((state) => state.userDto);

  useEffect(() => {
    console.log(userDto);
  }, []);

  return (
    <Container className="mt-2">
      <Form.Control type="text"></Form.Control>
    </Container>
  );
};

export default Foods;
