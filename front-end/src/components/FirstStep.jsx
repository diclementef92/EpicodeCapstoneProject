import { FloatingLabel, Form } from "react-bootstrap";

const FirstStep = ({ formData, setFormData }) => {
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
      <FloatingLabel label="password" className="mb-2">
        <Form.Control
          placeholder="Password"
          type="password"
          id="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
          required
        />
      </FloatingLabel>
    </>
  );
};

export default FirstStep;
