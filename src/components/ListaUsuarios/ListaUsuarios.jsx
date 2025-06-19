import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SpinnerButton from "../SpinnerButton/SpinnerButton"; 
import { Link } from "react-router-dom";
import FotoPerfil from "../FotoPerfil/FotoPerfil";

function ListaUsuarios({ busqueda, mostrarSoloActivos }) {
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

  const usuariosFiltrados = usuarios
    .filter((usuario) => {
      const nombreCompleto = `${usuario.name} ${usuario.lastname}`.toLowerCase();
      return nombreCompleto.includes(busqueda.toLowerCase());
    })
    .filter((usuario) => {
      // Solo mostrar los activos o inactivos según la pestaña
      if (user?.role === "admin") {
        return usuario.isActive === mostrarSoloActivos;
      } else {
        return usuario.isActive; // sanitarios solo ven activos
      }
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
              <Card.Body className="d-flex align-items-center">
                <div className="me-3">
                  <FotoPerfil rol={usuario.role} size={64} />
                </div>
                <div>
                  <Card.Title className="mb-1">
                    {usuario.name} {usuario.lastname}
                  </Card.Title>
                  <Card.Text className="mb-0">
                    <strong>Email:</strong> {usuario.email}
                    {user?.role !== "sanitario" && (
                      <>
                        <br />
                        <strong>Rol:</strong> {usuario.role}
                      </>
                    )}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default ListaUsuarios;
