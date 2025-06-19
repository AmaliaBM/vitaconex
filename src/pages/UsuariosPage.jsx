import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ListaUsuarios from "../components/ListaUsuarios/ListaUsuarios";
import Buscador from "../components/Buscador/Buscador";
import { Tabs, Tab } from "react-bootstrap";

function UsuariosPage() {
  const [busqueda, setBusqueda] = useState("");
  const [tab, setTab] = useState("activos");
  const { user } = useContext(AuthContext);

  const esAdmin = user?.role === "admin";

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Listado de Usuarios</h2>
      <Buscador value={busqueda} onChange={setBusqueda} />

      {esAdmin ? (
        <Tabs activeKey={tab} onSelect={setTab} className="mb-3 custom-tabs" fill >
          <Tab eventKey="activos" title="Usuarios Activos">
            <ListaUsuarios busqueda={busqueda} mostrarSoloActivos={true} />
          </Tab>
          <Tab eventKey="inactivos" title="Usuarios No Activos">
            <ListaUsuarios busqueda={busqueda} mostrarSoloActivos={false} />
          </Tab>
        </Tabs>
      ) : (
        <ListaUsuarios busqueda={busqueda} mostrarSoloActivos={true} />
      )}
    </div>
  );
}

export default UsuariosPage;

