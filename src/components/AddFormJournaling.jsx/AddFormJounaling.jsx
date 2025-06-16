import { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddFormJournaling() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleMoodChange = (e) => {
    const selectedMood = e.target.value;
    setMood(selectedMood);

    // Mensaje automático según el estado
    switch (selectedMood) {
      case "bien":
        setNote("¡Nos alegramos de que estés bien! ¿Quieres compartir algo más?");
        break;
      case "regular":
        setNote("¿Qué ha hecho que tu día sea regular?");
        break;
      case "mal":
        setNote("Lamentamos que te sientas mal. ¿Quieres contarnos qué ha pasado?");
        break;
      default:
        setNote("");
    }
  };

  return (
    <Row className="g-3">
      <Col xs={12}>
        <FloatingLabel controlId="floatingSelectMood" label="¿Cómo te encuentras?">
          <Form.Select
            aria-label="Selecciona tu estado de ánimo"
            value={mood}
            onChange={handleMoodChange}
          >
            <option value="">Selecciona tu estado de ánimo</option>
            <option value="bien">Bien</option>
            <option value="regular">Regular</option>
            <option value="mal">Mal</option>
          </Form.Select>
        </FloatingLabel>
      </Col>

      <Col xs={12}>
        <FloatingLabel controlId="floatingTextareaMoodNote" label="¿Por qué te sientes así?">
          <Form.Control
            as="textarea"
            placeholder="Escribe más detalles aquí..."
            style={{ height: '100px' }}
            value={note}
            onChange={(e) => setNote(e.target.value)} // El usuario puede editar el texto
          />
        </FloatingLabel>
      </Col>
    </Row>
  );
}

export default AddFormJournaling;
