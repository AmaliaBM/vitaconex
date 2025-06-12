

import { useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el refresh
    try {
         const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log("Login success:", response.data);
      // Aquí podrías guardar el token o redirigir al dashboard
    } catch (err) {
      console.error("Login error:", err);
      setError("Email o contraseña incorrectos.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm="2">Email</Form.Label>
        <Col sm="10">
          <Form.Control
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPassword">
        <Form.Label column sm="2">Password</Form.Label>
        <Col sm="10">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Col>
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}

      <div className="text-center">
        <Button type="submit" variant="primary">
          Iniciar Sesión
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;