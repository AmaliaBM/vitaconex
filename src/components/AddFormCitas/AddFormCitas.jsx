import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert
} from "react-bootstrap";

function AddFormCitas() {
  const { user } = useContext(AuthContext);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    pacienteId: "",
    medicoId: "",
    datetime: "",
    estado: "confirmado",
  });

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchData = async () => {
      try {
        const [resPatients, resDoctors, resAppointments] = await Promise.all([
          service.get("/admin/users?role=paciente"),
          service.get("/admin/users?role=sanitario"),
          service.get("/admin/appointments"),
        ]);

        setPatients(resPatients.data);
        setDoctors(resDoctors.data);
        setAppointments(resAppointments.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar datos del servidor.");
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pacienteId || !formData.medicoId || !formData.datetime) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setError(null);

      if (editingId) {
        await service.put(`/admin/appointments/${editingId}`, formData);
      } else {
        await service.post("/admin/appointments", formData);
      }

      const res = await service.get("/admin/appointments");
      setAppointments(res.data);

      setFormData({
        pacienteId: "",
        medicoId: "",
        datetime: "",
        estado: "confirmado",
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError("Error al guardar o actualizar la cita.");
    }
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment._id);
    setFormData({
      pacienteId: appointment.pacienteId._id,
      medicoId: appointment.medicoId._id,
      datetime: appointment.datetime.slice(0, 16),
      estado: appointment.estado,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta cita?")) return;

    try {
      await service.delete(`/admin/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la cita.");
    }
  };

  return (
    <Card className="p-4">
      <h3 className="mb-3">{editingId ? "Editar Cita" : "Añadir Cita"}</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Paciente</Form.Label>
              <Form.Select name="pacienteId" value={formData.pacienteId} onChange={handleChange}>
                <option value="">Seleccionar</option>
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} {p.lastname}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Médico</Form.Label>
              <Form.Select name="medicoId" value={formData.medicoId} onChange={handleChange}>
                <option value="">Seleccionar</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name} {d.lastname}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                name="datetime"
                value={formData.datetime}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={formData.estado} onChange={handleChange}>
                <option value="confirmado">Confirmado</option>
                <option value="cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {editingId ? (
          <Row className="align-items-center mt-3">
            <Col className="text-start">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    pacienteId: "",
                    medicoId: "",
                    datetime: "",
                    estado: "confirmado",
                  });
                }}
              >
                Cancelar edición
              </Button>
            </Col>
            <Col className="text-end">
              <Button type="submit" variant="primary">
                Actualizar
              </Button>
            </Col>
          </Row>
        ) : (
          <Button type="submit" variant="primary" className="mt-2">
            Crear
          </Button>
        )}
      </Form>

      <hr />
      <h4 className="mt-4">Lista de Citas</h4>

      <Row className="g-3"> 
        {appointments.map((a) => (
          <Col key={a._id} xs={12} md={6} lg={4}> 
            <Card
              className={`shadow-sm border-0 p-2 mb-2 small ${
                a.estado === "confirmado"// "g-3", xs, md, lg -> props de diseño responsive de Bootstrap //
                  ? "bg-confirmado text-dark"
                  : a.estado === "cancelado" //Se refiere al estado de la cita actual (a representa una cita dentro de .map()).
                  ? "bg-cancelado text-dark"
                  : "bg-light"
              }`}
            >
              <Card.Body> 
                <Card.Title className="fs-6">
                  {new Date(a.datetime).toLocaleString()}
                </Card.Title>

                <div className="mb-1"> 
                  <strong>Paciente:</strong><br />
                  {a.pacienteId?.name} {a.pacienteId?.lastname} 
                </div>

                <div className="mb-1"> 
                  <strong>Médico:</strong><br />
                  {a.medicoId?.name} {a.medicoId?.lastname}
                </div>
               
                <div className="mb-2">
                  <strong>Estado:</strong>{" "}
                  {a.estado === "confirmado" ? "Confirmado ✔" : "Cancelado ✖"}
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(a)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(a._id)}
                  >
                    Borrar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
}//optional chaining ?, una sintaxis que verifica que pacienteId no sea undefined o null antes de acceder a .name.

export default AddFormCitas;

