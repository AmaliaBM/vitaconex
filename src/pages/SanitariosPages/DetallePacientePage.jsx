import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SpinnerButton from "../../components/SpinnerButton/SpinnerButton";
import service from "../../services/service.config";

function DetallePacientePage() {
  const { id } = useParams(); // pacienteId
  const { user } = useContext(AuthContext);
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

        // Asumiendo que journaling viene como array o al menos se verifica
        setJournalings(Array.isArray(resJournal.data) ? resJournal.data : []);

        // Si medical-records devuelve { historial: [...] }, se usa eso, sino array directo
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
      <h2>{paciente.name} {paciente.lastname}</h2>
      <p><strong>Email:</strong> {paciente.email}</p>
      <p><strong>Fecha de nacimiento:</strong> {new Date(paciente.datebirth).toLocaleDateString()}</p>

      <h4 className="mt-4">Journalings</h4>
      <ul>
        {journalings.map(j => (
          <li key={j._id}>
            <strong>Fecha:</strong> {new Date(j.fecha).toLocaleDateString()} &nbsp;
            <strong>Estado ánimo:</strong> {j.estadoAnimo} <br />
            <em>{j.diario}</em>
          </li>
        ))}
      </ul>

      <h4 className="mt-4">Medical Records</h4>
      <ul>
        {records.map(r => (
          <li key={r._id}>
            <strong>Fecha:</strong> {new Date(r.datetime).toLocaleString()} <br />
            {r.contenido}
          </li>
        ))}
      </ul>

      <h5 className="mt-4">Añadir nuevo registro médico</h5>
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

