// src/pages/ErrorPages/Unauthorized.jsx
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Denegado() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-4 shadow-lg">
        <Card.Body>
          <Card.Title as="h1">🚫 Acceso denegado</Card.Title>
          <Card.Text>
            No tienes permisos para acceder a esta página.
          </Card.Text>
          <Button variant="warning" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Denegado;
