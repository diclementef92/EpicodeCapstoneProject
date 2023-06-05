import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { SignUp } from "../hooks/FechAuthentication";
import "../assets/SignForm.css";
import { useDispatch } from "react-redux";

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
    <Container className="d-flex justify-content-sm-center mt-4">
      {success ? (
        <Alert variant="success">
          {responseMsg}
          <a href="./login">Sign In</a>
        </Alert>
      ) : (
        <Row>
          <Col>
            <Card className="section-login">
              <Card.Body>
                <Card.Title>Register</Card.Title>
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
                  <input
                    type="text"
                    id="firstName"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                  {/* Last Name field*/}
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                  {/* Last Name field*/}
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
                  <div>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="MALE"
                      required
                      onClick={(e) => {
                        registerDto.gender = e.target.value;
                      }}
                    />
                    <label htmlFor="male">male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="FEMALE"
                      required
                      onClick={(e) => {
                        registerDto.gender = e.target.value;
                      }}
                    />
                    <label htmlFor="female">female</label>
                  </div>
                  <br />
                  {/* initial Weight Kg field*/}
                  <label htmlFor="initialWeightKg">Actual Weight (Kg):</label>
                  <div>
                    <input
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
                  </div>
                  {/* height Cm field*/}
                  <label htmlFor="heightCm">Height (Cm):</label>
                  <div>
                    {" "}
                    <input
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
                  </div>

                  <br />

                  {/* physicalActivityLevel field*/}
                  <label>Physical Activity Level:</label>

                  <div>
                    <input
                      type="radio"
                      id="low"
                      name="physicalActivityLevel"
                      value="LOW"
                      required
                      onClick={(e) => {
                        registerDto.physicalActivityLevel = e.target.value;
                      }}
                    />
                    <label htmlFor="low">LOW</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="medium"
                      name="physicalActivityLevel"
                      value="MEDIUM"
                      required
                      onClick={(e) => {
                        registerDto.physicalActivityLevel = e.target.value;
                      }}
                    />
                    <label htmlFor="medium">MEDIUM</label>
                  </div>
                  <div>
                    {" "}
                    <input
                      type="radio"
                      id="high"
                      name="physicalActivityLevel"
                      value="HIGH"
                      required
                      onClick={(e) => {
                        registerDto.physicalActivityLevel = e.target.value;
                      }}
                    />
                    <label htmlFor="high">HIGH</label>
                  </div>

                  <br />
                  {/* physicallyActive field*/}
                  <div>
                    <input
                      type="checkbox"
                      id="physicallyActive"
                      name="physicallyActive"
                      onClick={() => {
                        registerDto.physicallyActive =
                          !registerDto.physicallyActive;
                      }}
                    />
                    <label htmlFor="physicallyActive">physically Active</label>
                  </div>
                  <br />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={
                      !validName || !validPwd || !validMatch ? true : false
                    }
                  >
                    Sign Up
                  </Button>
                </Form>
                <hr />
                <p>
                  Already registered?
                  <br />
                  <span className="line">
                    <a href="./login">Go to Login Page</a>
                  </span>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Register;
