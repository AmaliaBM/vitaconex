import { Container } from "react-bootstrap";
import BotonesHome from "../../components/Botoneshome/BotonesHome";
import ArticlesOfInterest from "../ArticlesOfInterest/ArticlesOfInterst";
import Footer from "../../components/Footer/Footer"; 

function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <Container className="text-center py-5">
          {/* Logo */}
            <img
            src="/vitaconex.svg"
            alt="Logo VitaConex"
            className="logo-vita mb-4"
            />

          {/* Intro */}
          <div className="intro-text mb-4">
            <p>
              <strong>VitaConex</strong> es una aplicación desarrollada como proyecto final del bootcamp de <strong>Desarrollo Web en Ironhack</strong>.
            </p>
            <p>
              Permite a pacientes gestionar su salud y compartir su evolución con profesionales del ámbito sanitario.
            </p>
          </div>

          {/* Botones de acceso */}
          <div className="auth-buttons mb-4">
            <BotonesHome />
          </div>

          {/* Artículos */}
          <ArticlesOfInterest />
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
