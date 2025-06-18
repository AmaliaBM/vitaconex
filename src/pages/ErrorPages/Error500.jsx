
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Error500() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-4 shadow-lg">
        <Card.Body>
          <Card.Title as="h1">😓 Error 500</Card.Title>
          <Card.Text>
            Algo salió mal en el servidor. Por favor, intenta de nuevo más tarde.
          </Card.Text>
          <Button variant="primary" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Error500;