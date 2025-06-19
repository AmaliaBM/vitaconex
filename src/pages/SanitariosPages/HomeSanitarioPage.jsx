import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListaCitas from "../../components/ListaCitas/ListaCitas";
import Reloj from "../../components/Reloj/Reloj";
import FotoPerfil from "../../components/FotoPerfil/FotoPerfil";
import SpinnerButton from "../../components/SpinnerButton/SpinnerButton";
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
      {/* Bienvenida con imagen de perfil */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center">
          <FotoPerfil rol="sanitario" />
          <h5 className="mb-0 ms-3">Bienvenido/a {user?.name || "usuario"}</h5>
        </div>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      {/* Tarjeta de próximas citas con reloj */}
      <Card className="text-center mb-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div>
              <Card.Title>📅 Tus próximas citas</Card.Title>
              <Card.Text>
                Aquí puedes consultar las citas que te han sido agendadas.
              </Card.Text>
            </div>
            <div className="ms-3">
              <Reloj />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Lista de citas */}
      {!isLoading ? (
        <ListaCitas />
      ) : (
        <div className="d-flex justify-content-center my-5">
          <SpinnerButton />
        </div>
      )}
    </div>
  );
}

export default HomeSanitarioPage;


