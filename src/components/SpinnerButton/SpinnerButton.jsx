import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function SpinnerButton() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"  // Parpadeo en lugar de giro
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
        Cargando contenido, puede llevar unos minutos, por favor espere...
      </Button>
    </div>
  );
}

export default SpinnerButton;
