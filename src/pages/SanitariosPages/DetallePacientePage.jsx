import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function DetallePacientePage() {
  const { id } = useParams(); // pacienteId
  const { user } = useContext(AuthContext);
  const [paciente, setPaciente] = useState(null);
  const [journalings, setJournalings] = useState([]);
  const [records, setRecords] = useState([]);

  const [newRecordContent, setNewRecordContent] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  const fetchData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    };

    try {
      const resPaciente = await axios.get(`${API_URL}/api/sanitarios/users/${id}`, config);;
      const resJournal = await axios.get(`${API_URL}/api/sanitarios/journaling/${id}`, config);
        setJournalings(Array.isArray(resJournal.data) ? resJournal.data : []);
      const resRecords = await axios.get(`${API_URL}/api/sanitarios/medical-records/${id}`, config);
        setRecords(resRecords.data.historial || []);
      setPaciente(resPaciente.data);
      setJournalings(Array.isArray(resJournal.data) ? resJournal.data : []);
      setRecords(Array.isArray(resRecords.data) ? resRecords.data : []);
    } catch (err) {
      console.error(err);
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
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      };
      const res = await axios.post(
        `${API_URL}/api/sanitarios/medical-records/${id}`,
        { contenido: newRecordContent },
        config
      );
      setRecords((prev) => [res.data, ...prev]);
      setNewRecordContent("");
    } catch (error) {
      console.error("Error al añadir registro médico", error);
    }
    setLoading(false);
  };

if (!paciente) return <p>Cargando paciente...</p>;

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
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </Form>
  </div>
);
}

export default DetallePacientePage;

