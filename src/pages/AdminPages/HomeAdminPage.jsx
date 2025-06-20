import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListaCitas from "../../components/ListaCitas/ListaCitas";
import AddFormUser from "../../components/AddFormUser/AddFormUser";
import SpinnerButton from "../../components/SpinnerButton/SpinnerButton";
import Reloj from "../../components/Reloj/Reloj";
import FotoPerfil from "../../components/FotoPerfil/FotoPerfil";
import { AuthContext } from "../../context/auth.context";

function HomeAdminPage() {
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
          <FotoPerfil rol="admin" />
          <h5 className="mb-0 ms-3">
            Bienvenido/a {user?.name || "usuario"}
          </h5>
        </div>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      {/* Tarjeta de gestión de citas con reloj */}
      <Card className="text-center mb-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div>
              <Card.Title>📅 Gestión de citas</Card.Title>
              <Card.Text>
                Aquí puedes ver citas y navegar por tu espacio de administración.
              </Card.Text>
            </div>
            <div className="ms-3">
              <Reloj />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Lista de citas: Este código decide qué mostrar según el estado isLoading.
        Si los datos ya están listos (isLoading es falso), muestra la lista de citas.
        Si todavía están cargando (isLoading es verdadero), muestra un spinner para que el usuario sepa que espere. */}
      {!isLoading ? (
        <ListaCitas rol="admin" />
      ) : (
        <div className="d-flex justify-content-center my-4">
          <SpinnerButton />
        </div>
      )}

      <hr className="my-5" />

      {/* Formulario para crear nuevo usuario */}
      <Card className="p-3 shadow-sm">
        <Card.Title>➕ Crear nuevo usuario</Card.Title>
        <AddFormUser />
      </Card>
    </div>
  );
}

export default HomeAdminPage;
