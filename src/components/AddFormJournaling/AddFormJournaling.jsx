import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function AddFormJournaling({ onEntrySaved }) {
  const { user } = useContext(AuthContext);
  const [estadoAnimo, setEstadoAnimo] = useState("");
  const [diario, setDiario] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFeedback("");

    if (!estadoAnimo) {
      return setError("Por favor selecciona tu estado de ánimo.");
    }

    try {
      await service.post("/pacientes/journals", {
        estadoAnimo: Number(estadoAnimo),
        diario: diario,
      });

      setSuccess("Entrada registrada con éxito.");
      setDiario("");
      setEstadoAnimo("");

      if (onEntrySaved) onEntrySaved(); // actualiza la lista desde JournalingPage

      if (estadoAnimo <= 3) {
        setFeedback("Gracias por compartir cómo te sientes. Recuerda que no estás solo.");
      }
    } catch (err) {
      setError("Hubo un error al guardar tu entrada. Intenta más tarde.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {feedback && <Alert variant="info">{feedback}</Alert>}

      <Row className="mb-3">
        <Col md={6}>
          <FloatingLabel controlId="estadoAnimo" label="¿Cómo te sientes hoy?">
            <Form.Select
              value={estadoAnimo}
              onChange={(e) => setEstadoAnimo(e.target.value)}
            >
              <option value="">Selecciona tu estado de ánimo</option>
              <option value="1">😠 Muy enfadado</option>
              <option value="2">😢 Triste</option>
              <option value="3">😕 Meh</option>
              <option value="4">😐 Neutro</option>
              <option value="5">😊 Feliz</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <FloatingLabel controlId="diario" label="Escribe tu entrada...">
            <Form.Control
              as="textarea"
              style={{ height: "150px" }}
              placeholder="Escribe cómo te sientes hoy"
              value={diario}
              onChange={(e) => setDiario(e.target.value)}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button type="submit" variant="primary">
          Guardar entrada
        </Button>
      </div>
    </Form>
  );
}

export default AddFormJournaling;


