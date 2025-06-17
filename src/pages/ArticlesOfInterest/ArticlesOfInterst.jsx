import { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./ArticlesOfInterest.css";

const articles = [
  {
    id: 1,
    title: "¿Qué es VitaConex?",
    shortText: "Una app para pacientes y sanitarios, pensada para mejorar la comunicación.",
    fullText: `VitaConex nace como respuesta a la necesidad de mejorar la relación paciente-profesional médico. Desarrollada durante el bootcamp de Ironhack por Amalia Barrigas. Como diseñadora UX/UI estoy comprometida con la accesibilidad, usabilidad y eficiencia.`,
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 2,
    title: "Motivación detrás del proyecto",
    shortText: "El origen de la idea y su potencial impacto en la salud digital.",
    fullText: `La motivación nace de experiencias reales: pacientes que se sienten solos, sanitarios que necesitan centralizar la evolución del paciente, y la oportunidad de crear tecnología útil, con corazón y código. Además, permite un espacio de comprensión sobre el bienestar humano: lo emocional, lo físico y lo mental deben entenderse desde un prisma más unificado`,
    image: "https://via.placeholder.com/400x200",
  },
];

function ArticlesOfInterest() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="mb-4 article-card"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedArticle(article)}
          onKeyDown={(e) => e.key === "Enter" && setSelectedArticle(article)}
          aria-label={`Leer más sobre ${article.title}`}
        >
          <Card.Img variant="top" src={article.image} alt={article.title} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.shortText}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      {/* Modal */}
      <Modal
        show={!!selectedArticle}
        onHide={() => setSelectedArticle(null)}
        aria-labelledby="article-modal-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="article-modal-title">
            {selectedArticle?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedArticle?.image}
            alt={selectedArticle?.title}
            className="img-fluid mb-3 rounded"
          />
          <p>{selectedArticle?.fullText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedArticle(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ArticlesOfInterest;

