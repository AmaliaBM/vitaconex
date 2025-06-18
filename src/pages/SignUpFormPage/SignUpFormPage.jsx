import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function SignUpFormPage() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const { firstName, lastName, birthdate, email, password, agreedToTerms } = formData;

  if (!firstName.trim() || !lastName.trim() || !birthdate || !email.trim() || !password.trim() || !agreedToTerms) {
    alert("Please complete all required fields and agree to terms.");
    return;
  }

  setValidated(true);
  
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: firstName,
        lastname: lastName,
        datebirth: birthdate,
        email,
        password,
        role: "paciente",
      }),
    });

     let data;
  try {
    data = await response.json(); // parsear JSON
  } catch (err) {
    data = null;
  }

    if (!response.ok) throw new Error(data.msg || "Error en el registro: contraseña o email no");

    alert("Tu registro fue enviado. Administración debe aprobar tu cuenta antes de poder acceder.");
    navigate("/login");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustomBirthdate">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          required
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          La fecha de nacimiento es obligatoria.
        </Form.Control.Feedback>
      </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="validationCustomEmail">
        <Form.Label>Email</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">Email is required.</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="validationCustomPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          required
          name="agreedToTerms"
          checked={formData.agreedToTerms}
          onChange={handleChange}
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>

      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default SignUpFormPage;
