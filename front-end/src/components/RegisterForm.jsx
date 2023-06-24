import { Col, Container, Row, Button, Alert } from "react-bootstrap";
import FirstStep from "./FirstStep";
import { useState } from "react";
import "../assets/SignForm.css";

const maxStep = 3;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const RegisterForm = () => {
  const [page, setPage] = useState(0);
  const [errMessage, setErrMsg] = useState("");

  const [validUsername, setValidUsername] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPwd, setValidPwd] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "",
    initialWeightKg: 0.0,
    heightCm: 0.0,
    physicalActivityLevel: "",
    physicallyActive: false,
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
    if (page < maxStep - 1) {
      switch (page) {
        case 0:
          //formData validation
          if (
            formData.username &&
            formData.password &&
            formData.email &&
            USER_REGEX.test(formData.username) &&
            PWD_REGEX.test(formData.password) &&
            EMAIL_REGEX.test(formData.email)
          )
            setPage(page + 1);
          else {
            // setErrMsg("data not valid");

            switch (true) {
              case USER_REGEX.test(formData.username) === false:
                setErrMsg(
                  "Username not valid, istructions: 4 to 24 characters, Must begin with a letter, chars allowed: Letters, numbers, underscores, hyphens"
                );
                break;
              case EMAIL_REGEX.test(formData.email) === false:
                setErrMsg("Not a valid format for email");
                break;
              case PWD_REGEX.test(formData.password) === false:
                setErrMsg(
                  "Password not valid, istructions: - 8 to 24 characters\n- Must include uppercase and lowercase letters, a number and a special character.\n- Letters, numbers, underscores, hyphens allowed.\n- Allowed special characters: !, @, #,$,%"
                );
                break;

              default:
                break;
            }
          }
          break;

        default:
          break;
      }
    } else {
      //if page = maxStep-1 , submit
    }
  };
  return (
    <Container>
      <Row className="mx-0">
        <Col></Col>
        <Col xs={12} sm={6} className="section-login">
          {conditionalComponent()}
          {errMessage && <Alert variant="danger">{errMessage}</Alert>}
          <Row className="text-center mt-2">
            <Col xs={6}>
              {page > 0 && <a onClick={() => setPage(page - 1)}>{"< Back"}</a>}
            </Col>
            <Col xs={6}>
              <a onClick={handleSubmit}>
                {page < maxStep - 1 ? "Next >" : "Confirm"}
              </a>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
