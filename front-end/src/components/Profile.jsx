import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPencil,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import "../assets/Profile.css";

import { UpdateUser } from "../hooks/FetchUser";
import { useDispatch, useSelector } from "react-redux";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const userToUpdateDTO = {
  firstName: "",
  lastName: "",
  birthDay: "",
  heightCm: 0.0,
  physicalActivityLevel: "",
  physicallyActive: false,
  username: "",
  email: "",
};

const Profile = () => {
  const userDto = useSelector((state) => state.userDto);
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState(userDto.username);
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState(userDto.email);
  // const [validEmail, setValidEmail] = useState(false);
  // const [emailFocus, setEmailFocus] = useState(false);

  const [firstName, setFirstName] = useState(userDto.firstName);
  const [lastName, setLastName] = useState(userDto.lastName);
  const [birthDay, setBirthDay] = useState(userDto.birthDay);

  const [heightCm, setHeightCm] = useState(userDto.heightCm);

  const [physicalActivityLevel, setPhysicalActivityLevel] = useState(
    userDto.physicalActivityLevel
  );
  const [physicallyActive, setPhysicallyActive] = useState(
    userDto.physicallyActive
  );

  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // at beginning focus on username field
    if (userRef) userRef?.current.focus();
  }, []);

  const refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    setValidName(USER_REGEX.test(user)); // verify the username with regex
    console.log(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with Js Hacking
    const v1 = USER_REGEX.test(user);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }

    userToUpdateDTO.email = email;
    userToUpdateDTO.username = user;
    userToUpdateDTO.firstName = firstName;
    userToUpdateDTO.lastName = lastName;
    userToUpdateDTO.birthDay = birthDay;
    userToUpdateDTO.heightCm = heightCm;
    userToUpdateDTO.physicalActivityLevel = physicalActivityLevel;
    userToUpdateDTO.physicallyActive = physicallyActive;

    const responseUser = await UpdateUser(userDto.username, userToUpdateDTO);
    if (responseUser.errMessage) {
      setErrMsg(responseUser.errMessage);
      setSuccess(false);
    } else {
      setResponseMsg("Profile Successful Updated! 👍");
      dispatch({
        type: "SET_USER",
        payload: responseUser,
      });

      setSuccess(true);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-sm-center mt-4">
        <Row>
          <Col>
            <Card className="section-login">
              <Card.Body>
                {success ? (
                  <h2>{responseMsg}</h2>
                ) : (
                  <>
                    <Card.Title>
                      My Profile{" "}
                      <FontAwesomeIcon
                        icon={faPencil}
                        cursor={"pointer"}
                        visibility={editable ? "hidden" : "visible"}
                        onClick={() => setEditable(!editable)}
                      />
                      <FontAwesomeIcon
                        icon={faArrowRotateRight}
                        cursor={"pointer"}
                        visibility={editable ? "visible" : "hidden"}
                        onClick={() => {
                          setEditable(!editable);
                          refreshPage();
                        }}
                      />
                    </Card.Title>
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
                          className={
                            user ? (validName ? "valid" : "invalid") : ""
                          }
                          disabled={!editable}
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
                          disabled={!editable}
                          autoComplete="off"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                          //  onFocus={() => setUserFocus(true)}
                          // onBlur={() => setUserFocus(false)}
                        />
                      </FloatingLabel>

                      <br />
                      {/* First Name field*/}
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        id="firstName"
                        disabled={!editable}
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
                        disabled={!editable}
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                      />
                      {/* Last Name field*/}
                      <label htmlFor="birthDay">BirthDay:</label>
                      <input
                        type="date"
                        id="birthDay"
                        autoComplete="off"
                        disabled={!editable}
                        onChange={(e) => setBirthDay(e.target.value)}
                        value={birthDay}
                        required
                      />

                      <br />

                      {/* height Cm field*/}
                      <label htmlFor="heightCm">Height (Cm):</label>
                      <div>
                        {" "}
                        <input
                          type="number"
                          id="heightCm"
                          autoComplete="off"
                          disabled={!editable}
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
                          disabled={!editable}
                          defaultChecked={physicalActivityLevel === "LOW"}
                          required
                          onClick={(e) => {
                            setPhysicalActivityLevel(e.target.value);
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
                          disabled={!editable}
                          defaultChecked={physicalActivityLevel === "MEDIUM"}
                          required
                          onClick={(e) => {
                            setPhysicalActivityLevel(e.target.value);
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
                          disabled={!editable}
                          defaultChecked={physicalActivityLevel === "HIGH"}
                          required
                          onClick={(e) => {
                            setPhysicalActivityLevel(e.target.value);
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
                          disabled={!editable}
                          defaultChecked={physicallyActive === true}
                          onClick={() => {
                            setPhysicallyActive(
                              !userToUpdateDTO.physicallyActive
                            );
                          }}
                        />
                        <label htmlFor="physicallyActive">
                          physically Active
                        </label>
                      </div>
                      <br />
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={!validName || !editable ? true : false}
                      >
                        Save
                      </Button>
                    </Form>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
