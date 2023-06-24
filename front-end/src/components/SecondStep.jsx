import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { FloatingLabel, Form, FormGroup } from "react-bootstrap";

const SecondStep = ({ formData, setFormData }) => {
  return (
    <>
      <h2>User data:</h2>
      {/* First Name Field*/}
      <FloatingLabel label="First Name" className="mb-2">
        <Form.Control
          placeholder="First Name"
          type="text"
          id="firstName"
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          value={formData.firstName}
          required
        />
      </FloatingLabel>

      {/* Last Name Field*/}
      <FloatingLabel label="Last Name" className="mb-2">
        <Form.Control
          placeholder="Last Name"
          type="text"
          id="lastName"
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          value={formData.lastName}
          required
        />
      </FloatingLabel>

      {/* BirthDay field*/}
      <FloatingLabel label="Birthday" className="mb-2">
        <Form.Control
          placeholder="Birthday"
          type="date"
          id="birthDay"
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, birthDay: e.target.value })
          }
          max={new Date().toISOString().slice(0, 10)}
          value={formData.birthDay}
          required
        />
      </FloatingLabel>
      {/* todo: setting the value when turn back on this page  */}
      <Form.Check
        type="radio"
        id="male"
        name="gender"
        value="MALE"
        label="Male"
        required
        onClick={(e) =>
          setFormData({
            ...formData,
            gender: e.target.value,
          })
        }
      />
      <Form.Check
        type="radio"
        id="female"
        name="gender"
        value="FEMALE"
        label="Female"
        required
        onClick={(e) =>
          setFormData({
            ...formData,
            gender: e.target.value,
          })
        }
      />
    </>
  );
};

export default SecondStep;
