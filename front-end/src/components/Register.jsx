import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { SignUp } from "../hooks/FechAuthentication";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/SignForm.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const registerDto = {
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
};

const Register = () => {
  const dispatch = useDispatch();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  // const [validEmail, setValidEmail] = useState(false);
  // const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const [initialWeightKg, setInitialWeightKg] = useState(0);
  const [heightCm, setHeightCm] = useState(0);

  // const [gender, setGender] = useState("");
  // const [physicalActivityLevel, setPhysicalActivityLevel] = useState("");
  // const [physicallyActive, setPhysicallyActive] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // at beginning focus on username field
    if (userRef) userRef?.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user)); // verify the username with regex
    console.log(user);
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd)); //verify the password with regex
    setValidMatch(pwd === matchPwd); // confirm password
    console.log(pwd);
    console.log(matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg(""); // reset error message
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with Js Hacking
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    registerDto.firstName = firstName;
    registerDto.lastName = lastName;
    registerDto.birthDay = birthDay;
    registerDto.initialWeightKg = initialWeightKg;
    registerDto.heightCm = heightCm;
    registerDto.email = email;
    registerDto.username = user;
    registerDto.password = pwd;
    const res = await SignUp(registerDto);
    if (!res) {
      setErrMsg("Server Error");
      return;
    }
    if (res.errMessage) {
      setErrMsg(res.errMessage);
      setSuccess(false);
      return;
    }
    setResponseMsg(res);
    setSuccess(true);

    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };

  return (
    <Container>
      <Row className="mx-0">
        <Col></Col>
        {success ? (
          <Col xs={6}>
            <Alert variant="success">
              {responseMsg}
              <a href="./login">Sign In</a>
            </Alert>
          </Col>
        ) : (
          <Col xs={12} sm={6} className="section-login">
            <>
              <h2>Register</h2>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <Form onSubmit={handleSubmit}>
                {/* Username field */}
                <FloatingLabel label="Username" className="mb-2">
                  <Form.Control
                    className={user ? (validName ? "valid" : "invalid") : ""}
                    placeholder="Username"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    //for screen reader
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    //
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />

                  <p
                    id="uidnote"
                    className={
                      userFocus && user && !validName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </FloatingLabel>
                {/* Email field */}
                <FloatingLabel label="Email" className="mb-2">
                  <Form.Control
                    placeholder="Email"
                    type="email"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    //  onFocus={() => setUserFocus(true)}
                    // onBlur={() => setUserFocus(false)}
                  />
                </FloatingLabel>
                {/* Password Field */}
                <FloatingLabel label="password" className="mb-2">
                  <Form.Control
                    placeholder="Password"
                    className={pwd ? (validPwd ? "valid" : "invalid") : ""}
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                </FloatingLabel>
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
                {/* Confimation password */}
                <FloatingLabel label="confirm password">
                  <Form.Control
                    className={
                      matchPwd ? (validMatch ? "valid" : "invalid") : ""
                    }
                    placeholder="confirm password"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                </FloatingLabel>
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
                <br />
                {/* First Name field*/}
                <label htmlFor="firstName">First Name:</label>
                <Form.Control
                  type="text"
                  id="firstName"
                  autoComplete="off"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                />
                {/* Last Name field*/}
                <label htmlFor="lastName">Last Name:</label>
                <Form.Control
                  type="text"
                  id="lastName"
                  autoComplete="off"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                />
                {/* birthDay field*/}
                <label htmlFor="birthDay">BirthDay:</label>
                <Form.Control
                  type="date"
                  id="birthDay"
                  autoComplete="off"
                  onChange={(e) => setBirthDay(e.target.value)}
                  max={new Date().toISOString().slice(0, 10)}
                  value={birthDay}
                  required
                />
                <br />
                {/* Gender field*/}
                <Form.Check
                  type="radio"
                  id="male"
                  name="gender"
                  value="MALE"
                  label="Male"
                  required
                  onClick={(e) => {
                    registerDto.gender = e.target.value;
                  }}
                />
                <Form.Check
                  type="radio"
                  id="female"
                  name="gender"
                  value="FEMALE"
                  label="Female"
                  required
                  onClick={(e) => {
                    registerDto.gender = e.target.value;
                  }}
                />
                <br />
                {/* initial Weight Kg field*/}
                <label htmlFor="initialWeightKg">Actual Weight (Kg):</label>
                <Form.Control
                  type="number"
                  id="initialWeightKg"
                  autoComplete="off"
                  onChange={(e) => setInitialWeightKg(e.target.value)}
                  value={initialWeightKg}
                  required
                  step="0.01"
                  min="30"
                  max="300"
                />
                <span className="validity"></span>
                <br />
                {/* height Cm field*/}
                <label htmlFor="heightCm">Height (Cm):</label>
                <Form.Control
                  type="number"
                  id="heightCm"
                  autoComplete="off"
                  onChange={(e) => setHeightCm(e.target.value)}
                  value={heightCm}
                  required
                  step="0.01"
                  min="100"
                  max="250"
                />
                <span className="validity"></span>
                <br />
                {/* physicalActivityLevel field*/}
                <label>Physical Activity Level on your daily routine:</label>
                <Form.Check
                  type="radio"
                  id="low"
                  name="physicalActivityLevel"
                  value="LOW"
                  label="Low:"
                  required
                  onClick={(e) => {
                    registerDto.physicalActivityLevel = e.target.value;
                  }}
                />
                <p className="text-muted">
                  employees, freelancers, technicians or similar
                </p>

                <Form.Check
                  type="radio"
                  id="medium"
                  name="physicalActivityLevel"
                  value="MEDIUM"
                  label="Medium:"
                  required
                  onClick={(e) => {
                    registerDto.physicalActivityLevel = e.target.value;
                  }}
                />
                <p className="text-muted">
                  housewives, domestic workers, sales staff or similar
                </p>

                <Form.Check
                  type="radio"
                  id="high"
                  name="physicalActivityLevel"
                  value="HIGH"
                  label="High:"
                  required
                  onClick={(e) => {
                    registerDto.physicalActivityLevel = e.target.value;
                  }}
                />
                <p className="text-muted">
                  workers in agriculture, breeding, fishing, production
                  operators and transporters
                </p>

                <br />
                {/* physicallyActive field*/}
                <Form.Check
                  type="checkbox"
                  id="physicallyActive"
                  name="physicallyActive"
                  label="Physically Active:"
                  onClick={() => {
                    registerDto.physicallyActive =
                      !registerDto.physicallyActive;
                  }}
                />
                <p className="text-muted">
                  check if you dedicate four or five times a week at least 20
                  minutes to physical exercises of sufficient intensity to cause
                  evident sweating
                </p>
                <br />
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={
                      !validName || !validPwd || !validMatch ? true : false
                    }
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
              <hr />
              <p className="text-center">
                Already registered?
                <br />
                <span className="line">
                  <Link to="/login">Go to Login Page</Link>
                </span>
              </p>
            </>
          </Col>
        )}
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Register;
