import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";

import DailyCalories from "./DailyCalories";
import MyNavbar from "./MyNavbar";
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  FormLabel,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
  const [username, setUsername] = useState(userDto.username);

  useEffect(() => {
    setUserToUpdateDTO("username", userDto.username);
  }, []);

  const setUserToUpdateDTO = (field, value) => {
    userToUpdateDTO[field] = value;
    console.log(userToUpdateDTO.username);
  };

  const handleSubmit = () => {};

  return (
    <>
      <MyNavbar />
      {/* Form */}

      <Container className="mt-4">
        <Card>
          <h1>My Profile</h1>
          <FormLabel label="Username" className="mb-2">
            <Form.Control
              // className={userDto ? (validName ? "valid" : "invalid") : ""}
              placeholder="Username"
              type="text"
              id="username"
              // ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}

              //for screen reader
              // aria-invalid={validName ? "false" : "true"}
              // aria-describedby="uidnote"
              //
              // onFocus={() => setUserFocus(true)}
              // onBlur={() => setUserFocus(false)}
            />

            {/* <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p> */}
          </FormLabel>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
