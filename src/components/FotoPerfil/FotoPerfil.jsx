import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const imagenesPorRol = {
  admin: 'https://res.cloudinary.com/dagphzq9d/image/upload/v1750324844/agenda_aztwre.svg',
  sanitario: 'https://res.cloudinary.com/dagphzq9d/image/upload/v1750324844/cruzsanitaria_do3e22.svg',
  paciente: 'https://res.cloudinary.com/dagphzq9d/image/upload/v1750324844/paraperfilpaciente_uxxz46.svg',
};

function FotoPerfil({ rol }) {
  const imagenSrc = imagenesPorRol[rol];

  return (
    <Container className="mb-3">
      <Row className="justify-content-center">
        <Col xs="auto">
          <Image
            src={imagenSrc}
            alt={`Foto de perfil de ${rol}`}
            roundedCircle
            className="perfil-foto img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default FotoPerfil;
