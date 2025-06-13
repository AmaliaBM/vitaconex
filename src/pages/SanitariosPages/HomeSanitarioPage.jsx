import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListaCitas from "../../components/ListaCitas/ListaCitas";
import { AuthContext } from "../../context/auth.context";

function HomeSanitarioPage() {
  const { user, isLoading, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">👨‍⚕️ Bienvenido/a {user?.name || "usuario"}</h5>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title>📅 Tus próximas citas</Card.Title>
          <Card.Text>
            Aquí puedes consultar las citas que te han sido agendadas.
          </Card.Text>
        </Card.Body>
      </Card>

      {!isLoading ? (
        <ListaCitas />
      ) : (
        <p className="text-center">Cargando citas...</p>
      )}
    </div>
  );
}

export default HomeSanitarioPage;
