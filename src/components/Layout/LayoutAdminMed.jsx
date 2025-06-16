

// src/layouts/LayoutAdminMed.jsx
import { Outlet } from "react-router-dom";
import TabNavegacionTres from "../TabNavegacion/TabNavegacionTres";

function LayoutAdminMed() {
  return (
    <div className="container mt-4 mb-5">
      <Outlet />

      <div className="fixed-bottom bg-white border-top p-2 d-md-none">
        <TabNavegacionTres />
      </div>

      <div className="d-none d-md-block mt-4">
        <TabNavegacionTres />
      </div>
    </div>
  );
}

export default LayoutAdminMed;
