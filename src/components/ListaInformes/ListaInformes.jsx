
// src/components/ListaInformes/ListaInformes.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

function ListaInformes() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };

        // ✅ IMPORTANTE: ruta correcta para el paciente
        const response = await axios.get(`${API_URL}/api/paciente/medical-records`, config);
        setRecords(response.data);
      } catch (error) {
        console.error("Error al cargar los informes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) return <p>Cargando informes...</p>;

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