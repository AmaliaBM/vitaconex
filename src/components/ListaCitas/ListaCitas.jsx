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

  // Mostrar solo si es médico
  if (user?.role !== "sanitario") return null;

  const citasFuturas = appointments.filter(
    (cita) => new Date(cita.datetime) >= new Date()
  );

  return (
    <Row xs={1} md={2} className="g-4">
      {citasFuturas.length === 0 ? (
        <Col>
          <p className="text-center">No hay citas futuras registradas.</p>
        </Col>
      ) : (
        citasFuturas.map((cita) => (
          <Col key={cita._id}>
            <Card
              className={`info-card shadow-sm border-0 mb-4 ${
                cita.estado === "confirmado"
                  ? "bg-confirmado text-dark"
                  : cita.estado === "cancelado"
                  ? "bg-cancelado text-dark"
                  : "bg-light"
              }`}
            >
              <Card.Body>
                <Card.Title className="card-fecha mb-3">
                  {new Date(cita.datetime).toLocaleString()}
                </Card.Title>

                {cita.pacienteId && (
                  <div className="mb-2">
                    <strong>Paciente:</strong><br />
                    {cita.pacienteId.name} {cita.pacienteId.lastname}
                  </div>
                )}

                <div className="mt-3">
                  <span className="fw-semibold">
                    Estado:{" "}
                    {cita.estado === "confirmado"
                      ? "Confirmado ✔"
                      : "Cancelado ✖"}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default ListaCitas;
