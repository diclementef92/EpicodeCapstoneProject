import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import "../assets/Register.css";
import { SignUp } from "./FechAuthentication";

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

    setResponseMsg(await SignUp(registerDto));

    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>{responseMsg}</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            {/* Username field */}
            <label htmlFor="username">
              UserName:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
            </label>
            <input
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
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            {/* Email field */}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              //  onFocus={() => setUserFocus(true)}
              // onBlur={() => setUserFocus(false)}
            />

            {/* Password Field */}
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
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
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
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
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
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
            <input
              type="date"
              id="birthDay"
              autoComplete="off"
              onChange={(e) => setBirthDay(e.target.value)}
              value={birthDay}
              required
            />
            <br />
            {/* initial Weight Kg field*/}
            <label htmlFor="initialWeightKg">Actual Weight (Kg):</label>
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
            {/* height Cm field*/}
            <label htmlFor="heightCm">Height (Cm):</label>
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

            {/* physicalActivityLevel field*/}
            <label>Physical Activity Level:</label>
            <div>
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
            <br />
            {/* physicallyActive field*/}
            <div>
              <input
                type="checkbox"
                id="physicallyActive"
                name="physicallyActive"
                onClick={() => {
                  registerDto.physicallyActive = !registerDto.physicallyActive;
                }}
              />
              <label htmlFor="physicallyActive">physically Active</label>
            </div>

            <br />
            <button
              className="btn-primary"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
