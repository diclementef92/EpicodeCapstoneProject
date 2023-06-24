import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const ThirdStep = ({ formData, setFormData }) => {
  return (
    <>
      <h2>Personal data:</h2>

      {/* initial Weight Kg field*/}
      <FloatingLabel label="Actual Weight (Kg):" className="mb-2">
        <Form.Control
          placeholder="Actual Weight (Kg):"
          type="number"
          id="initialWeightKg"
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, initialWeightKg: e.target.value })
          }
          value={formData.initialWeightKg}
          required
          step="0.1"
          min="30"
          max="300"
        />
      </FloatingLabel>
      {/* height Cm field*/}
      <FloatingLabel label="Height (Cm)" className="mb-2">
        <Form.Control
          placeholder="Height (Cm)"
          type="number"
          id="heightCm"
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, heightCm: e.target.value })
          }
          value={formData.heightCm}
          required
          step="0.01"
          min="100"
          max="250"
        />
      </FloatingLabel>
      {/* physicalActivityLevel field*/}
      <label>Physical Activity Level on your daily routine:</label>
      <Form.Check
        type="radio"
        id="low"
        name="physicalActivityLevel"
        value="LOW"
        label="Low:"
        required
        onClick={(e) => {
          setFormData({ ...formData, physicalActivityLevel: e.target.value });
        }}
      />
      <p className="text-muted">
        employees, freelancers, technicians or similar
      </p>

      <Form.Check
        type="radio"
        id="medium"
        name="physicalActivityLevel"
        value="MEDIUM"
        label="Medium:"
        required
        onClick={(e) => {
          setFormData({ ...formData, physicalActivityLevel: e.target.value });
        }}
      />
      <p className="text-muted">
        housewives, domestic workers, sales staff or similar
      </p>

      <Form.Check
        type="radio"
        id="high"
        name="physicalActivityLevel"
        value="HIGH"
        label="High:"
        required
        onClick={(e) => {
          setFormData({ ...formData, physicalActivityLevel: e.target.value });
        }}
      />
      <p className="text-muted">
        workers in agriculture, breeding, fishing, production operators and
        transporters
      </p>

      <br />
      {/* physicallyActive field*/}
      <Form.Check
        type="checkbox"
        id="physicallyActive"
        name="physicallyActive"
        label="Physically Active:"
        onClick={(e) => {
          setFormData({ ...formData, physicallyActive: e.target.value });
        }}
      />
      <p className="text-muted">
        check if you dedicate four or five times a week at least 20 minutes to
        physical exercises of sufficient intensity to cause evident sweating
      </p>
    </>
  );
};

export default ThirdStep;
