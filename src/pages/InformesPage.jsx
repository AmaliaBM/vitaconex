import React from "react";
import ListaInformes from "../components/ListaInformes/ListaInformes";

function InformesPage() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Informes</h2>
      <ListaInformes />
    </div>
  );
}

export default InformesPage;