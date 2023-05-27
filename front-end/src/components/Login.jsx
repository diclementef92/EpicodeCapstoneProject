import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  FloatingLabel,
  Button,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../hooks/FechAuthentication";
import { FetchUser } from "../hooks/FetchUser";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const loginDto = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const userDto = useSelector((state) => state.userDto);

  useEffect(() => {
    // at beginning focus on username field
    if (userRef) userRef?.current.focus();
    if (userDto.username) {
      //if user is already logged
      setSuccess(true);
      setResponseMsg("user already logged in");
    }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user)); // verify the username with regex
    console.log(user);
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd)); //verify the password with regex
    console.log(pwd);
  }, [pwd]);

  useEffect(() => {
    setErrMsg(""); // reset error message
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with Js Hacking
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    loginDto.username = user;
    loginDto.password = pwd;

    const res = await SignIn(loginDto);

    if (!res) {
      setErrMsg("Server Error");
    }
    //if response status not ok
    else if (res.status) {
      setErrMsg(res.message);
      setSuccess(false);
    } else {
      setResponseMsg("Wellcome " + res.username);
      console.log(res);

      //save user to redux
      const userDto = await FetchUser();
      console.log(userDto);
      if (userDto.errMessage) {
        setErrMsg(userDto.errMessage);
      } else {
        dispatch({
          type: "SET_USER",
          payload: userDto,
        });
        setSuccess(true);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-sm-center mt-4">
      <Row className="justify-content-sm-center mt-4">
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body className="text-center">
              {success ? (
                <>
                  <Card.Title>{responseMsg}</Card.Title>
                  <br />
                  <Button href={"./dashboard"}>Go to DashBoard</Button>
                </>
              ) : (
                <>
                  <Card.Title>Login</Card.Title>

                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>

                  {/* Form */}
                  <Form onSubmit={handleSubmit}>
                    {/* Username field */}

                    <FloatingLabel label="Username" className="mb-2">
                      <Form.Control
                        className={
                          user ? (validName ? "valid" : "invalid") : ""
                        }
                        placeholder="username"
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
                    </FloatingLabel>

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

                    {/* Password Field */}
                    <FloatingLabel label="Password">
                      <Form.Control
                        className={pwd ? (validPwd ? "valid" : "invalid") : ""}
                        placeholder="Password"
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
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>{" "}
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="dollar sign">$</span>{" "}
                      <span aria-label="percent">%</span>
                    </p>
                    <br />
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={!validName || !validPwd ? true : false}
                    >
                      Sign In
                    </Button>
                  </Form>

                  <hr />
                  <p>
                    Not already registered?
                    <br />
                    <span className="line">
                      <a href="./register">Go to Registration Page</a>
                    </span>
                  </p>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
