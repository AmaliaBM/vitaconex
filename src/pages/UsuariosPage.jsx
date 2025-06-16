
import { useState } from "react";
import ListaUsuarios from "../components/ListaUsuarios/ListaUsuarios";
import Buscador from "../components/Buscador/Buscador";

function UsuariosPage() {
  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Listado de Usuarios</h2>
      <Buscador value={busqueda} onChange={setBusqueda} />
      <ListaUsuarios busqueda={busqueda} />
    </div>
  );
}

export default UsuariosPage;
