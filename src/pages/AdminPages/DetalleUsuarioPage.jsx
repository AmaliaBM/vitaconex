
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

function DetalleUsuarioPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const response = await axios.get(`${API_URL}/api/admin/users/${userId}`, config);
        setUsuario(response.data);
      } catch (err) {
        setError("No se pudo cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      await axios.put(`${API_URL}/api/admin/users/${userId}`, usuario, config);
      setSuccess("Usuario actualizado con éxito.");
    } catch (err) {
      setError("Error al actualizar el usuario.");
    }
  };

  const handleDelete = async () => {
    setDeleteError("");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        data: {
          password: passwordConfirm,
        },
      };

      await axios.delete(`${API_URL}/api/admin/users/${userId}/secure`, config);
      navigate("/home-admin"); // Redirige después de eliminar
    } catch (err) {
      setDeleteError(
        err.response?.data?.msg || "Error al eliminar el usuario."
      );
    }
  };

  if (loading) return <Spinner animation="border" />;

  if (!usuario) return <p>Usuario no encontrado.</p>;

  return (
    <div className="container mt-4">
      <h2>Editar Usuario</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={usuario.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={usuario.lastname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={usuario.email}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="datebirth"
            value={usuario.datebirth?.slice(0, 10)}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rol</Form.Label>
          <Form.Select name="role" value={usuario.role} onChange={handleChange}>
            <option value="paciente">Paciente</option>
            <option value="sanitario">Sanitario</option>
            <option value="admin">Administrador</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="¿Activo?"
            name="isActive"
            checked={usuario.isActive}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Volver
          </Button>
          <div className="d-flex button-group-separated">
          <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
           Eliminar usuario
          </Button>
          <Button variant="primary" type="submit">
            Guardar cambios
          </Button>
        </div>
        </div>
      </Form>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Para eliminar este usuario, ingresa tu contraseña de administrador:</p>
          <Form.Control
            type="password"
            placeholder="Tu contraseña"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {deleteError && <Alert variant="danger" className="mt-3">{deleteError}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar y eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetalleUsuarioPage;

