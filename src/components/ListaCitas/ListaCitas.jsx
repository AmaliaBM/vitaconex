import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SpinnerButton from "../../components/SpinnerButton/SpinnerButton";

function ListaCitas() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;

      try {
        const roleEndpoints = {
          paciente: "pacientes",
          sanitario: "sanitarios",
          admin: "admin"
        };

        const endpoint = roleEndpoints[user.role];
        const response = await service.get(`/${endpoint}/appointments`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error al cargar citas:", error);
        setError("No se pudieron cargar las citas.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) return <SpinnerButton />;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <Row xs={1} md={2} className="g-4">
      {appointments.length === 0 ? (
        <Col>
          <p className="text-center">No hay citas registradas.</p>
        </Col>
      ) : (
        appointments.map((cita) => (
          <Col key={cita._id}>
            <Card>
              <Card.Body>
                <Card.Title>{new Date(cita.datetime).toLocaleString()}</Card.Title>
                <Card.Text>
                  {user.role === "paciente" && cita.medicoId && (
                    <>Especialista: {cita.medicoId.name} {cita.medicoId.lastname}</>
                  )}
                  {user.role === "sanitario" && cita.pacienteId && (
                    <>Paciente: {cita.pacienteId.name} {cita.pacienteId.lastname}</>
                  )}
                  {user.role === "admin" && (
                    <>
                      Paciente: {cita.pacienteId?.name} {cita.pacienteId?.lastname} | 
                      Especialista: {cita.medicoId?.name} {cita.medicoId?.lastname}
                    </>
                  )}
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

