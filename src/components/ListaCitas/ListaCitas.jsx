import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function ListaCitas() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let response;

        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        };

        if (user.role === "paciente") {
          response = await axios.get(`${API_URL}/api/pacientes/appointments`, config);
        } else if (user.role === "medico") {
          response = await axios.get(`${API_URL}/api/sanitarios/appointments`, config);
        } else if (user.role === "admin") {
          response = await axios.get(`${API_URL}/api/admin/appointments`, config);
        }

        setAppointments(response.data);
      } catch (error) {
        console.error("Error al cargar citas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAppointments();
  }, [user]);

  if (loading) return <p>Cargando citas...</p>;

  return (
    <Row xs={1} md={2} className="g-4">
      {appointments.length === 0 ? (
        <Col>
          <p className="text-center">No hay citas registradas.</p>
        </Col>
      ) : (
        appointments.map((cita, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body>
                <Card.Title>{cita.date}</Card.Title>
                <Card.Text>
                  {user.role === "paciente" && `Especialista: ${cita.specialist}`}
                  {user.role === "sanitario" && `Paciente: ${cita.patientName}`}
                  {user.role === "admin" &&
                    `Paciente: ${cita.pacienteId.name} ${cita.pacienteId.lastname} | Especialista: ${cita.sanitarioId.name} ${cita.sanitarioId.lastname}`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default ListaCitas;
