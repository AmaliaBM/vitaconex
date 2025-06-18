import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpinnerButton from "../SpinnerButton/SpinnerButton"; 
import { Link } from "react-router-dom";

function ListaUsuarios({ busqueda }) {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        let response;

        if (user?.role === "sanitario") {
          response = await service.get("/sanitarios/users");
        } else if (user?.role === "admin") {
          response = await service.get("/admin/users");
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

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nombreCompleto = `${usuario.name} ${usuario.lastname}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

  if (loading) return <SpinnerButton />;

  return (
    <Row xs={1} md={2} className="g-4">
      {usuariosFiltrados.length === 0 ? (
        <Col>
          <p className="text-center">No hay usuarios que coincidan con la búsqueda.</p>
        </Col>
      ) : (
        usuariosFiltrados.map((usuario) => (
          <Col key={usuario._id}>
            <Card
              as={Link}
              to={
                user?.role === "admin"
                  ? `/admin/usuarios/${usuario._id}`
                  : `/paciente/${usuario._id}`
              }
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
              className="h-100"
            >
              <Card.Body>
                <Card.Title>
                  {usuario.name} {usuario.lastname}
                </Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {usuario.email}
                  <br />
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
