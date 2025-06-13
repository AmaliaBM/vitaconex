import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListaCitas from "../../components/ListaCitas/ListaCitas";
import { AuthContext } from "../../context/auth.context";

function HomePacientePage() {
  const { user, isLoading, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();           // elimina token y usuario del contexto
    navigate("/login");     // redirige al login
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">👋 Bienvenido/a {user?.name || "usuario"}</h5>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <Card className="text-center mb-4">
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
        <p className="text-center">Cargando tus citas...</p>
      )}
    </div>
  );
}

export default HomePacientePage;

