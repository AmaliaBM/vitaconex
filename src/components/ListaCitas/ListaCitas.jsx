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
    {appointments.filter(cita => new Date(cita.datetime) >= new Date()).length === 0 ? (
      <Col>
        <p className="text-center">No hay citas futuras registradas.</p>
      </Col>
    ) : (
      appointments
        .filter(cita => new Date(cita.datetime) >= new Date())
        .map((cita) => (
          <Col key={cita._id}>
            <Card>
              <Card.Body className="position-relative">
                {/* Botón eliminar */}
                <button
                  onClick={() =>
                    setAppointments((prev) => prev.filter((c) => c._id !== cita._id))
                  }
                  className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                  aria-label="Eliminar cita visualmente"
                  style={{ zIndex: 10 }}
                >
                  ❌
                </button>

                {/* Fecha y hora más oscura */}
                <Card.Title style={{ color: '#333', fontWeight: '600' }}>
                  {new Date(cita.datetime).toLocaleString()}
                </Card.Title>

                {/* Información paciente y especialista en líneas separadas */}
                <Card.Text>
                  {user.role === "paciente" && cita.medicoId && (
                    <>
                      <div style={{ fontWeight: '500' }}>Especialista:</div>
                      <div>{cita.medicoId.name} {cita.medicoId.lastname}</div>
                    </>
                  )}

                  {user.role === "sanitario" && cita.pacienteId && (
                    <>
                      <div style={{ fontWeight: '500' }}>Paciente:</div>
                      <div>{cita.pacienteId.name} {cita.pacienteId.lastname}</div>
                    </>
                  )}

                  {user.role === "admin" && (
                    <>
                      <div style={{ fontWeight: '500' }}>Paciente:</div>
                      <div>{cita.pacienteId?.name} {cita.pacienteId?.lastname}</div>
                      <div style={{ fontWeight: '500', marginTop: '0.5rem' }}>Especialista:</div>
                      <div>{cita.medicoId?.name} {cita.medicoId?.lastname}</div>
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

