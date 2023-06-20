import { useState } from "react";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";

const FirstStep = ({ formData, setFormData }) => {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  return (
    <>
      <h2>Registration data:</h2>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
    </>
  );
};

export default FirstStep;
