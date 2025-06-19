import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListaCitas from "../../components/ListaCitas/ListaCitas";
import CustomCharts from "../../components/Charts/CustomCharts";
import SpinnerButton from "../../components/SpinnerButton/SpinnerButton";
import FotoPerfil from "../../components/FotoPerfil/FotoPerfil";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/service.config";

function HomePacientePage() {
  const { user, isLoading, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [journals, setJournals] = useState([]);
  const [loadingJournals, setLoadingJournals] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchJournals = async () => {
      try {
        const response = await service.get("/pacientes/journals?limit=3&sort=-fecha");
        setJournals(response.data);
      } catch (error) {
        console.error("Error al cargar las entradas de journaling:", error);
      } finally {
        setLoadingJournals(false);
      }
    };

    fetchJournals();
  }, [user]);

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  const irAJournaling = () => {
    navigate("/journaling");
  };

  const primerLinea = (texto) => {
    if (!texto) return "";
    return texto.split("\n")[0].slice(0, 100);
  };

   return (
    <div className="container mt-4 mb-5">
      {/* Encabezado con imagen y saludo */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center">
          <FotoPerfil rol="paciente" />
          <h5 className="mb-0 ms-3">Bienvenido/a {user?.name || "usuario"}</h5>
        </div>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      {/* Texto descriptivo para la gráfica emocional */}
      <div className="text-center mb-4">
        <h4 
          className="fw-semibold" 
          style={{ 
            color: "#2c3e50", 
            fontWeight: '600', 
            letterSpacing: '0.03em',
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: 1.3,
            userSelect: "none" // para evitar selección accidental
          }}
        >
          Aquí puedes encontrar tu gráfica en relación a cómo te has sentido estos días:
        </h4>
      </div>

      <CustomCharts />

      <Card className="text-center mt-5 mb-4">
        <Card.Body>
          <Card.Title>📅 Tus citas</Card.Title>
          <Card.Text>
            Aquí puedes ver tus próximas citas y navegar por tu espacio.
          </Card.Text>
        </Card.Body>
      </Card>

      {!isLoading ? (
        <ListaCitas rol="paciente" />
      ) : (
        <div className="d-flex justify-content-center my-4">
          <SpinnerButton />
        </div>
      )}

      <Card className="mt-5">
        <Card.Body>
          <Card.Title>📝 Últimas entradas de tu diario</Card.Title>
          {loadingJournals ? (
            <div className="d-flex justify-content-center my-3">
              <SpinnerButton />
            </div>
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
