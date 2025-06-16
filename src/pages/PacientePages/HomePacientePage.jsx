import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListaCitas from "../../components/ListaCitas/ListaCitas";
import CustomCharts from "../../components/Charts/CustomCharts";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";


function HomePacientePage() {
  const { user, isLoading, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user) return;

    const fetchJournals = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        };

        // Traemos las últimas 3 entradas ordenadas por fecha descendente
        const response = await axios.get(
          `${API_URL}/api/pacientes/journals?limit=3&sort=-fecha`,
          config
        );

        setJournals(response.data);
      } catch (error) {
        console.error("Error al cargar las entradas de journaling:", error);
      } finally {
        setLoadingJournals(false);
      }
    };

    fetchJournals();
  }, [user, API_URL]);

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  const irAJournaling = () => {
    navigate("/journaling");
  };

  const primerLinea = (texto) => {
    if (!texto) return "";
    return texto.split("\n")[0].slice(0, 100); // hasta 100 caracteres de la primera línea
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">👋 Bienvenido/a {user?.name || "usuario"}</h5>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
      <CustomCharts />
      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title>📅 Tus citas</Card.Title>
          <Card.Text>Aquí puedes ver tus próximas citas y navegar por tu espacio.</Card.Text>
        </Card.Body>
      </Card>

      {!isLoading ? <ListaCitas rol="paciente" /> : <p className="text-center">Cargando tus citas...</p>}

      <Card className="mt-5">
        <Card.Body>
          <Card.Title>📝 Últimas entradas de tu diario</Card.Title>
          {loadingJournals ? (
            <p>Cargando entradas...</p>
          ) : journals.length === 0 ? (
            <p>No has registrado ninguna entrada aún.</p>
          ) : (
            journals.map((entry) => (
              <div key={entry._id} className="mb-3">
                <strong>{new Date(entry.fecha || entry.date).toLocaleDateString()}</strong>
                <p>{primerLinea(entry.diario || entry.content)}...</p>
              </div>
            ))
          )}
          <Button variant="outline-primary" size="sm" onClick={irAJournaling}>
            Ver más
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomePacientePage;

