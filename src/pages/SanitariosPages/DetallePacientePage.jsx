import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpinnerButton from "../../components/SpinnerButton/SpinnerButton";
import service from "../../services/service.config";
import FotoPerfil from "../../components/FotoPerfil/FotoPerfil";

function DetallePacientePage() {
  const { id } = useParams();
  //const { user } = useContext(AuthContext);
  const [paciente, setPaciente] = useState(null);
  const [journalings, setJournalings] = useState([]);
  const [records, setRecords] = useState([]);
  const [newRecordContent, setNewRecordContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPaciente = await service.get(`/sanitarios/users/${id}`);
        const resJournal = await service.get(`/sanitarios/journaling/${id}`);
        const resRecords = await service.get(`/sanitarios/medical-records/${id}`);

        setPaciente(resPaciente.data);
        setJournalings(Array.isArray(resJournal.data) ? resJournal.data : []);

        if (resRecords.data.historial) {
          setRecords(resRecords.data.historial);
        } else if (Array.isArray(resRecords.data)) {
          setRecords(resRecords.data);
        } else {
          setRecords([]);
        }
      } catch (err) {
        console.error(err);
        setPaciente(null);
        setJournalings([]);
        setRecords([]);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRecordContent.trim()) return;

    setLoading(true);
    try {
      const res = await service.post(`/sanitarios/medical-records/${id}`, {
        contenido: newRecordContent,
      });

      setRecords((prev) => [res.data, ...prev]);
      setNewRecordContent("");
    } catch (error) {
      console.error("Error al añadir registro médico", error);
    }
    setLoading(false);
  };

  const estadoAnimoToEmoji = (valor) => {
    const mapa = {
      1: "😠",
      2: "😢",
      3: "😕",
      4: "😐",
      5: "😊",
    };
    return mapa[valor] || valor;
  };

  if (!paciente) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center my-5">
        <SpinnerButton />
        <p className="mt-3">Cargando datos del paciente...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Encabezado con foto y datos */}
      <Row className="align-items-center mb-4">
        <Col xs={12} md="auto" className="text-center mb-3 mb-md-0">
          <FotoPerfil rol="paciente" />
        </Col>
        <Col>
          <h2>{paciente.name} {paciente.lastname}</h2>
          <p><strong>Fecha de nacimiento:</strong> {new Date(paciente.datebirth).toLocaleDateString()}</p>
          <p><strong>Email:</strong> {paciente.email}</p>
        </Col>
      </Row>

      {/* Journalings */}
      <h4 className="mt-4 mb-3">Journalings</h4>
      <Row className="g-3">
        {journalings.map(j => (
          <Col md={6} key={j._id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>
                  {estadoAnimoToEmoji(j.estadoAnimo)} - {new Date(j.fecha).toLocaleDateString()}
                </Card.Title>
                <Card.Text>
                  <em>{j.diario}</em>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Medical Records */}
      <h4 className="mt-5 mb-3">Historial Médico</h4>
      <Row className="g-3">
        {records.map(r => (
          <Col md={6} key={r._id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Subtitle className="mb-2 card-fecha">
                {new Date(r.datetime).toLocaleString()}
                </Card.Subtitle>
                <Card.Text>{r.contenido}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Formulario nuevo registro */}
      <h5 className="mt-5">Añadir nuevo registro médico</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="newRecord">
          <Form.Label>Contenido</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newRecordContent}
            onChange={(e) => setNewRecordContent(e.target.value)}
            placeholder="Escribe el contenido del registro médico..."
            disabled={loading}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading} className="mt-2">
          {loading ? (
            <>
              <SpinnerButton /> Guardando...
            </>
          ) : (
            "Guardar"
          )}
        </Button>
      </Form>
    </div>
  );
}

export default DetallePacientePage;


