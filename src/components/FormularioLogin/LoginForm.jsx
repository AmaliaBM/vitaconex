import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service.config";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { AuthContext } from "../../context/auth.context";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // <-- Estado para spinner
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);  // <-- activa spinner

    try {
      const response = await service.post("/auth/login", { email, password });
      const { authToken, user } = response.data;

      storeToken(authToken);
      await authenticateUser();

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
    } finally {
      setLoading(false); // <-- apaga spinner
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
          disabled={loading} // desabilita, disable es etiqueta del input. 
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
          disabled={loading}
        />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}

      <div className="text-center">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Cargando...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
