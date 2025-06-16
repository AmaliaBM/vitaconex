

import TabNavegacion from "../TabNavegacion/TabNavegacion";


import { Outlet } from "react-router-dom";

function LayoutPaciente() {
  return (
    <div className="container mt-4 mb-5">
      <Outlet />  {/* Esto renderiza las rutas hijas */}

      <div className="fixed-bottom bg-white border-top p-2 d-md-none">
        <TabNavegacion />
      </div>
      <div className="d-none d-md-block mt-4">
        <TabNavegacion />
      </div>
    </div>
  );
}

export default LayoutPaciente;
