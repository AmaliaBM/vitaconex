
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function ListaJournaling({ pacienteId }) {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        };

        let response;

        if (user.role === "paciente") {
          // Paciente ve solo sus propios diarios
          response = await axios.get(`${API_URL}/api/pacientes/journaling`, config);
        } else if (user.role === "sanitario" && pacienteId) {
          // Sanitario accede a los diarios del paciente seleccionado
          response = await axios.get(`${API_URL}/api/sanitarios/journaling/${pacienteId}`, config);
        }

        setEntries(response?.data || []);
      } catch (error) {
        console.error("Error al cargar entradas del diario:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchEntries();
  }, [user, pacienteId]);

  if (loading) return <p>Cargando entradas del diario...</p>;

  return (
    <Row xs={1} md={2} className="g-4">
      {entries.length === 0 ? (
        <Col>
          <p className="text-center">No hay entradas registradas.</p>
        </Col>
      ) : (
        entries.map((entry, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body>
                <Card.Title>{new Date(entry.date).toLocaleDateString()}</Card.Title>
                <Card.Text>{entry.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default ListaJournaling;