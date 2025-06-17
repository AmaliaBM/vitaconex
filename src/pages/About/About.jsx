import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

function AboutPage() {
  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4">
            <Card.Body>
              <Card.Title className="mb-3">Sobre mí</Card.Title>

              <Card.Text>
                ¡Hola! Soy <strong>Amalia Barrigas Munuera</strong>, Jr.Full Stack web development y diseñadora UX/UI. 
                Además de estar siempre aprendiendo dentro del sector tech, me apasiona la <strong>psicología</strong>, en especial la neuropsicología y las divergencias cognitivas.
              </Card.Text>

              <Card.Text>
                Me considero una persona muy conectada con el mundo natural: disfruto del tiempo al aire libre, los <strong>animales</strong> y la <strong>comida casera</strong>. 
                También he practicado deporte durante muchos años y creo firmemente que mantener <strong>hábitos saludables</strong> es esencial para una vida plena.
              </Card.Text>

              <Card.Text>
                Este equilibrio entre la tecnología, la salud y el bienestar personal es lo que inspira muchos de mis proyectos.
              </Card.Text>

              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  href="https://www.linkedin.com/in/amaliabarrigasmunuera/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conecta conmigo en LinkedIn
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
