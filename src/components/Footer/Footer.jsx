import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-5 bg-light py-4 border-top">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h6>Usuarios de prueba</h6>
            <ul>
              <li><strong>Admin:</strong> Acceso público NO permitido</li>
              <li><strong>Sanitario:</strong> medico1@medico1.com / medico1@ </li>
              <li><strong>Paciente:</strong> paciente1@paciente.com / paciente1@ </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Más info sobre este proyecto</h6>
            <p>
              Click <Link to="/info-proyecto">aquí</Link> para conocer más información sobre el desarrollo de esta aplicación.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6>About</h6>
            <p>
              Si quieres conocer más sobre mí y este proyecto, visita la sección de{" "}
              <Link to="/about">About</Link>.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
