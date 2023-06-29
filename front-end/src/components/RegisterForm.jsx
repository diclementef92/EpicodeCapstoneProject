import { Col, Container, Row, Alert } from "react-bootstrap";
import { useState } from "react";
import "../assets/SignForm.css";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { SignUp } from "../hooks/FechAuthentication";
import { useDispatch } from "react-redux";

const maxStep = 3;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [errMessage, setErrMsg] = useState("");

  const [responseMsg, setResponseMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      case 1:
        return <SecondStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <ThirdStep formData={formData} setFormData={setFormData} />;
      default:
        return <FirstStep formData={formData} setFormData={setFormData} />;
    }
  };

  const handleSubmit = async (e) => {
    switch (page) {
      case 0:
        if (
          formData.username &&
          formData.password &&
          formData.email &&
          USER_REGEX.test(formData.username) &&
          PWD_REGEX.test(formData.password) &&
          EMAIL_REGEX.test(formData.email)
        ) {
          setPage(page + 1);
          setErrMsg("");
        } else {
          setErrMsg(getErrorMessage());
        }
        break;

      case 1:
        if (
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          formData.birthDay &&
          (formData.gender === "MALE" || formData.gender === "FEMALE")
        ) {
          setPage(page + 1);
          setErrMsg("");
        } else {
          setErrMsg(getErrorMessage());
        }
        break;
      case 2:
        //if page = maxStep-1 , submit
        e.preventDefault();
        const v1 = USER_REGEX.test(formData.username);
        const v2 = PWD_REGEX.test(formData.password);
        const v3 = EMAIL_REGEX.test(formData.email);
        const msg = "";
        if (!v1) msg += "username not valid\n";
        if (!v2) msg += "password not valid\n";
        if (!v3) msg += "email not valid\n";
        if (!v1 || !v2 || !v3) {
          setErrMsg(msg);
          return;
        }
        const res = await SignUp(formData);
        if (!res) {
          setErrMsg("Server Error");
          return;
        }
        if (res.errMessage) {
          setErrMsg(res.errMessage);
          return;
        }
        setResponseMsg(res);
        setSuccess(true);

        //logout if a user previous logged in
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");

      default:
        break;
    }
  };

  const getErrorMessage = () => {
    switch (true) {
      case USER_REGEX.test(formData.username) === false:
        return "Username not valid, istructions: 4 to 24 characters, Must begin with a letter, chars allowed: Letters, numbers, underscores, hyphens";
      case EMAIL_REGEX.test(formData.email) === false:
        return "Not a valid format for email";
      case PWD_REGEX.test(formData.password) === false:
        return "Password not valid, istructions: 8 to 24 characters\n- Must include uppercase and lowercase letters, a number and a special character.\n- Letters, numbers, underscores, hyphens allowed.\n- Allowed special characters: !, @, #,$,%";
      case !formData.gender ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.birthDay:
        return "Please compile every field";
      default:
        return "Data input not valid";
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
