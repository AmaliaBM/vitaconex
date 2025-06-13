import { useContext } from "react";
import Card from "react-bootstrap/Card";
import ListaCitas from "../../components/ListaCitas/ListaCitas";
import TabNavegacion from "../../components/TabNavegacion/TabNavegacion";
import { AuthContext } from "../../context/auth.context";

function HomePacientePage() {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <div className="container mt-4 mb-5">
      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title>👋 Bienvenido/a {user?.name || "usuario"}</Card.Title>
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

      {/* Menú de navegación fijo en móvil */}
      <div className="fixed-bottom bg-white border-top p-2 d-md-none">
        <TabNavegacion />
      </div>

      {/* Menú de navegación normal en pantallas grandes */}
      <div className="d-none d-md-block mt-4">
        <TabNavegacion />
      </div>
    </div>
  );
}

export default HomePacientePage;

