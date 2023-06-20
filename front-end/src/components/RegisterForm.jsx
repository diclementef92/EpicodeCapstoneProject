import { Col, Container, Row, Button } from "react-bootstrap";
import FirstStep from "./FirstStep";
import { useState } from "react";
import "../assets/SignForm.css";

// const registerDto = {
//   firstName: "",
//   lastName: "",
//   birthDay: "",
//   initialWeightKg: 0.0,
//   heightCm: 0.0,
//   gender: "",
//   physicalActivityLevel: "",
//   physicallyActive: false,
//   username: "",
//   email: "",
//   password: "",
// };
const maxStep = 2;

const RegisterForm = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    initialWeightKg: 0.0,
    heightCm: 0.0,
    gender: "",
    physicalActivityLevel: "",
    physicallyActive: false,
    username: "",
    email: "",
    password: "",
  });

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <FirstStep formData={formData} setFormData={setFormData} />;
      // case 1:
      //   return <SecondStep formData={formData} setFormData={setFormData} />;
      // case 2:
      //   return <ThirdStep formData={formData} setFormData={setFormData} />;
      default:
        return <FirstStep formData={formData} setFormData={setFormData} />;
    }
  };

  const handleSubmit = () => {
    if (page < maxStep) {
      setPage(page + 1);
    } else {
      //submit
    }
  };
  return (
    <Container>
      <Row className="mx-0">
        <Col></Col>
        <Col xs={12} sm={6} className="section-login">
          {conditionalComponent()}
          <Button onClick={handleSubmit}>
            {page < maxStep ? "Next" : "Submit"}
          </Button>
          {page > 0 && <Button onClick={() => setPage(page - 1)}>Back</Button>}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
