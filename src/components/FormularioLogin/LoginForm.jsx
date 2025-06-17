import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/auth.context"; // Asegúrate que la ruta es correcta

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

 const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      { email, password }
    );

    const { authToken, user } = response.data;

    // 1. Guarda el token
    storeToken(authToken);

    // 2. Verifica el usuario con el token
    await authenticateUser();

    // 3. Redirige según el rol
    const routeByRole = {
      paciente: "/home",
      sanitario: "/home-medico",
      admin: "/home-admin",
    };

    if (user?.role && routeByRole[user.role]) {
      navigate(routeByRole[user.role]);
    } else {
      setError("Rol desconocido. No se pudo redirigir.");
    }

  } catch (err) {
    console.error("Login error:", err);
    setError("Email o contraseña incorrectos.");
  }
};

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
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
