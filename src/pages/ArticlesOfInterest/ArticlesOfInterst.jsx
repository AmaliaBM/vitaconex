
import "./ArticlesOfInterest.css";
import Card from "react-bootstrap/Card";

function ArticlesOfInterest() {
  return (
    <div className="articles-container mt-4">
      <Card className="mb-3">
        <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
        <Card.Body>
          <Card.Title>Ejemplo de Artículo 1</Card.Title>
          <Card.Text>Texto explicativo del artículo 1.</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
        <Card.Body>
          <Card.Title>Ejemplo de Artículo 2</Card.Title>
          <Card.Text>Texto explicativo del artículo 2.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ArticlesOfInterest;
