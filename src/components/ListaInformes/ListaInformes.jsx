
// src/components/ListaInformes/ListaInformes.jsx
import { useEffect, useState } from "react";
import service from "../../services/service.config";
import Card from "react-bootstrap/Card";
import SpinnerButton from "../SpinnerButton/SpinnerButton";

function ListaInformes() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await service.get("/pacientes/medical-records");
        console.log("Informes recibidos:", response.data);
        setRecords(response.data);
      } catch (error) {
        console.error("Error al cargar los informes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) return <SpinnerButton />;

  if (records.length === 0) return <p>No hay informes disponibles.</p>;

  return (
    <>
      {records.map((record) => (
        <Card key={record._id} className="mb-3">
          <Card.Body>
            <Card.Title>
              Informe del {new Date(record.datetime).toLocaleString()}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Escrito por: {record.medicoId?.name} {record.medicoId?.lastname}
            </Card.Subtitle>
            <Card.Text>{record.contenido}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default ListaInformes;
