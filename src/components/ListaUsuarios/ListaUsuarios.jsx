
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ListaUsuarios() {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        };

        let response;

        if (user.role === "sanitario") {
          // ✅ Ruta corregida para sanitarios
          response = await axios.get(`${API_URL}/api/sanitarios/users`, config);
        } else if (user.role === "admin") {
          response = await axios.get(`${API_URL}/api/admin/users`, config);
        }

        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUsuarios();
  }, [user]);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <Row xs={1} md={2} className="g-4">
      {usuarios.length === 0 ? (
        <Col>
          <p className="text-center">No hay usuarios disponibles.</p>
        </Col>
      ) : (
        usuarios.map((usuario, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body>
                <Card.Title>{usuario.name} {usuario.lastname}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {usuario.email}<br />
                  <strong>Rol:</strong> {usuario.role}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default ListaUsuarios;
