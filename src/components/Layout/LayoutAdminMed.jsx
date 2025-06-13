


// src/layouts/LayoutAdmin.jsx
import TabNavegacionTres from "../TabNavegacion/TabNavegacionTres";
import { Outlet } from "react-router-dom";

function LayoutAdmin() {
  return (
    <div className="container mt-4 mb-5">
      <Outlet />

      {/* Menú fijo para móviles */}
      <div className="fixed-bottom bg-white border-top p-2 d-md-none">
        <TabNavegacionTres />
      </div>

      {/* Menú visible en pantallas grandes */}
      <div className="d-none d-md-block mt-4">
        <TabNavegacionTres />
      </div>
    </div>
  );
}

export default LayoutAdmin;