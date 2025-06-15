
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ListaInformes() {
  const { user } = useContext(AuthContext);
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        let response;

        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        };

        if (user.role === "paciente") {
          response = await axios.get(`${API_URL}/api/pacientes/medical-records`, config);
        } else if (user.role === "sanitario") {
          response = await axios.get(`${API_URL}/api/sanitarios/medical-records`, config);
        } else {
          console.warn("Este usuario no tiene acceso a informes.");
          return;
        }

        setInformes(response.data);
      } catch (error) {
        console.error("Error al cargar informes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchInformes();
  }, [user]);

  if (loading) return <p>Cargando informes...</p>;

  return (
    <Row xs={1} md={2} className="g-4">
      {informes.length === 0 ? (
        <Col>
          <p className="text-center">No hay informes disponibles.</p>
        </Col>
      ) : (
        informes.map((informe, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body>
                <Card.Title>Fecha: {new Date(informe.date).toLocaleDateString()}</Card.Title>
                <Card.Text>
                  {user.role === "paciente" && `Redactado por: ${informe.sanitarioName}`}
                  {user.role === "sanitario" && `Paciente: ${informe.pacienteName}`}
                </Card.Text>
                <Card.Text>{informe.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default ListaInformes;
