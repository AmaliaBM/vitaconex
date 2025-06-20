
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SpinnerButton from "../SpinnerButton/SpinnerButton";
/*Qué significa moodEmojis[entry.estadoAnimo] || "❓" */

function ListaJournaling({ pacienteId, refresh, onRefresh }) {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editDiario, setEditDiario] = useState("");
  const [editEstadoAnimo, setEditEstadoAnimo] = useState("");

  const moodEmojis = {
    1: "😡",
    2: "😭",
    3: "😕",
    4: "😐",
    5: "😄",
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        let response;

        if (user.role === "paciente") {
          response = await service.get("/pacientes/journals");
        } else if (user.role === "sanitario" && pacienteId) {
          response = await service.get(`/sanitarios/journals/${pacienteId}`);
        }

        setEntries(response?.data || []);
      } catch (error) {
        console.error("Error al cargar entradas del diario:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchEntries();
  }, [user, pacienteId, refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta entrada?")) return;

    try {
      await service.delete(`/pacientes/journals/${id}`);
      if (onRefresh) onRefresh(); /*es una función que debe ejecutarse para refrescar (actualizar) la interfaz*/
    } catch (error) {
      console.error("Error al eliminar la entrada:", error);
      alert("Error al eliminar la entrada, intenta más tarde.");
    }
  };

  const startEditing = (entry) => {
    setEditingId(entry._id);
    setEditEstadoAnimo(entry.estadoAnimo.toString());
    setEditDiario(entry.diario || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditEstadoAnimo("");
    setEditDiario("");
  };

  const handleEditSubmit = async (id) => {
    try {
      await service.put(`/pacientes/journals/${id}`, {
        estadoAnimo: Number(editEstadoAnimo),
        diario: editDiario,
      });
      cancelEditing();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error al actualizar la entrada:", error);
      alert("Error al actualizar la entrada, intenta más tarde.");
    }
  };

  if (loading) return <SpinnerButton />;

  return (
    <Row xs={1} md={2} className="g-4">
      {entries.length === 0 ? (
        <Col>
          <p className="text-center">No hay entradas registradas.</p>
        </Col>
      ) : (
        entries.map((entry) => (
          <Col key={entry._id}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {new Date(entry.fecha || entry.date).toLocaleDateString()}
                </Card.Title>

                {editingId === entry._id ? (
                  <>
                    <Form.Group className="mb-3" controlId="editEstadoAnimo">
                      <Form.Label>Estado de ánimo</Form.Label>
                      <Form.Select
                        value={editEstadoAnimo}
                        onChange={(e) => setEditEstadoAnimo(e.target.value)}
                      >
                        <option value="1">😡 Muy enfadado</option>
                        <option value="2">😭 Triste</option>
                        <option value="3">😕 Meh</option>
                        <option value="4">😐 Neutro</option>
                        <option value="5">😄 Feliz</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="editDiario">
                      <Form.Label>Entrada del diario</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={editDiario}
                        onChange={(e) => setEditDiario(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleEditSubmit(entry._id)}
                      >
                        Guardar
                      </Button>
                      <Button variant="secondary" size="sm" onClick={cancelEditing}>
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Card.Text>
                      <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
                        {moodEmojis[entry.estadoAnimo] || "❓"}
                      </span>
                      {entry.diario || entry.content}
                    </Card.Text>

                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => startEditing(entry)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(entry._id)}
                      >
                        Borrar
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default ListaJournaling;