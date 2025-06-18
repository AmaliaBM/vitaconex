
import { useContext } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function NotFound() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleRedirect = () => {
    if (isLoggedIn) {
      navigate("/"); // o a su dashboard específico
    } else {
      navigate("/login");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <Card className="text-center p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Body>
          <h1 className="display-4"> 404 - Página no encontrada</h1>
          <Card.Text className="mt-3">
            Lo sentimos, la página que estás buscando no existe o ha sido movida. <br />
            Recuerda que tu bienestar digital también importa. 🧘
          </Card.Text>
          <Button variant="primary" className="mt-3" onClick={handleRedirect}>
            {isLoggedIn ? "Volver al inicio" : "Iniciar sesión"}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFound;