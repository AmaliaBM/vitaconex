import { Container } from "react-bootstrap";
import BotonesHome from "../../components/Botoneshome/BotonesHome";
import ArticlesOfInterest from "../ArticlesOfInterest/ArticlesOfInterst";


function HomePage() {
  return (
    <div className="HomePage">
      <div className="home-wrapper">
        <Container className="home-container text-center py-5">
          <div className="intro-text">
            <p>
              <strong>VitaConex</strong> es una aplicación desarrollada como proyecto final del bootcamp de <strong>Desarrollo Web en Ironhack</strong>.
            </p>
            <p>
              Permite a pacientes gestionar su salud y compartir su evolución con profesionales del ámbito sanitario.
            </p>
          </div>

          <BotonesHome />
           {/* Artículos informativos debajo de los botones */}
          <ArticlesOfInterest />
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
