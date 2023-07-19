import { useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const FirstStep = ({ formData, setFormData }) => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") setPasswordType("text");
    else setPasswordType("password");
  };

  return (
    <>
      <h2>Registration data:</h2>

      {/* Username field */}
      <FloatingLabel label="Username" className="mb-2">
        <Form.Control
          placeholder="Username"
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          value={formData.username}
          required
        />
      </FloatingLabel>

      {/* Email field */}
      <FloatingLabel label="Email" className="mb-2">
        <Form.Control
          placeholder="Email"
          type="email"
          id="email"
          autoComplete="off"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
          required
        />
      </FloatingLabel>

      {/* Password Field */}
      <InputGroup>
        <FloatingLabel label="password" className="mb-2">
          <Form.Control
            placeholder="Password"
            type={passwordType}
            id="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            required
          />
        </FloatingLabel>
        <Button variant="outline" onClick={togglePassword}>
          {passwordType === "password" ? (
            <BsFillEyeFill></BsFillEyeFill>
          ) : (
            <BsFillEyeSlashFill></BsFillEyeSlashFill>
          )}
        </Button>
      </InputGroup>
    </>
  );
};

export default FirstStep;
