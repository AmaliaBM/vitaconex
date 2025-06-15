import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ListaInformes from "../components/ListaInformes/ListaInformes";

function InformesPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Acceso no autorizado. Por favor, inicia sesión.</p>;
  }

  if (user.role !== "paciente" && user.role !== "sanitario") {
    return <p>No tienes permisos para ver esta página.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Informes</h2>
      <ListaInformes />
    </div>
  );
}

export default InformesPage;
