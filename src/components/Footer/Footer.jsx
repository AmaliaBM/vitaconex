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
              <li><strong>Admin:</strong> admin@vitaconex.com / 123456</li>
              <li><strong>Sanitario:</strong> doc@vitaconex.com / 123456</li>
              <li><strong>Paciente:</strong> user@vitaconex.com / 123456</li>
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
              VitaConex es un proyecto full-stack desarrollado con Node.js, Express, MongoDB y React.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
