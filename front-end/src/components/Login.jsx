import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { SignIn } from "../hooks/FechAuthentication";
import "../assets/Register.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const loginDto = {
  username: "",
  password: "",
};

const Login = () => {
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

    //if response status not ok
    if (res.status) {
      setErrMsg(res.message);
      setSuccess(false);
    } else {
      setResponseMsg("Wellcome " + res.username);
      console.log(res);
      setSuccess(true);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>{responseMsg}</h1>
          <p>
            <a href="/Dashboard">Go to DashBoard</a>
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
          <h1>Login</h1>
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
            <br />
            <button
              className="btn-primary"
              disabled={!validName || !validPwd ? true : false}
            >
              Sign In
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
