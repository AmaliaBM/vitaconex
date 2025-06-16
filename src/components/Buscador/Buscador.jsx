import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function Buscador({ value, onChange }) {
  return (
    <Form.Group className="mb-3" controlId="busquedaUsuarios">
      <Form.Label>Buscar usuario por nombre o apellido</Form.Label>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Ej: Ana Martínez"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <Button variant="outline-secondary" onClick={() => onChange("")}>
            Limpiar
          </Button>
        )}
      </InputGroup>
    </Form.Group>
  );
}

export default Buscador;