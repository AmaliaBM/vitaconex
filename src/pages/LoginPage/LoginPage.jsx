
// src/pages/LoginPage.jsx
import { Container, Row, Col, Card } from "react-bootstrap";
import LoginForm from "../../components/FormularioLogin/LoginForm"; // Ajusta la ruta si es necesario

function LoginPage() {
  return (
    <div className="login-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow">
              <Card.Body>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <LoginForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
