import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/service.config";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

function AddFormUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "paciente",
    datebirth: "",
    assignedSanitarios: "",
  });
  const [sanitarios, setSanitarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSanitarios = async () => {
      try {
        const response = await service.get("/admin/users?role=sanitario");
        setSanitarios(response.data);
      } catch (err) {
        console.error("Error al cargar sanitarios", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSanitarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Si cambia el rol a distinto de paciente, limpiar el campo assignedSanitarios
    if (name === "role" && value !== "paciente") {
      setFormData((prev) => ({
        ...prev,
        assignedSanitarios: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      ...formData,
      assignedSanitarios: formData.assignedSanitarios || null,
    };

    try {
      await service.post("/admin/users", payload);
      setSuccess("Usuario creado con éxito.");
      setTimeout(() => {
        navigate("/usuariospage");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error al crear usuario.");
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-4">
      <h2>Crear nuevo usuario</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            isInvalid={error.toLowerCase().includes("email")}
          />
          <Form.Control.Feedback type="invalid">
            {error.toLowerCase().includes("email") ? error : ""}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="datebirth"
            value={formData.datebirth}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rol</Form.Label>
          <Form.Select name="role" value={formData.role} onChange={handleChange}>
            <option value="paciente">Paciente</option>
            <option value="sanitario">Sanitario</option>
            <option value="admin">Administrador</option>
          </Form.Select>
        </Form.Group>

        {formData.role === "paciente" && (
          <Form.Group className="mb-3">
            <Form.Label>Asignar sanitario</Form.Label>
            <Form.Select
              name="assignedSanitarios"
              value={formData.assignedSanitarios}
              onChange={handleChange}
            >
              <option value="">-- Ninguno --</option>
              {sanitarios.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} {s.lastname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Crear usuario
        </Button>
      </Form>
    </div>
  );
}

export default AddFormUser;

