import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function TabNavegacionTres() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const path = location.pathname;

  let activeKey = "";
  if (path.includes("home-admin") || path.includes("home-medico")) {
    activeKey = "home";
  } else if (path.includes("citas")) {
    activeKey = "citas";
  } else if (path.includes("usuarios")) { // <- Cambiado aquí
    activeKey = "users";
  }

  const handleSelect = (key) => {
    if (!user) return;

    switch (key) {
      case "home":
        if (user.role === "admin") {
          navigate("/home-admin");
        } else if (user.role === "sanitario") {
          navigate("/home-medico");
        }
        break;
      case "citas":
        navigate("/citas");
        break;
      case "users": // <- Cambiado aquí 
        navigate("/usuariospage"); 
        break;
      default:
        break;
    }
  };

  return (
    <Tabs
      activeKey={activeKey}
      onSelect={handleSelect}
      id="tabs-navegacion"
      className="nav-tabs-responsive"
      fill
      justify
    >
      <Tab
        eventKey="home"
        title={
          <span className="tab-title">
            <div>🏠</div>
            <div className="d-none d-md-block">Inicio</div>
          </span>
        }
      />
      <Tab
        eventKey="citas"
        title={
          <span className="tab-title">
            <div>📅</div>
            <div className="d-none d-md-block">Citas</div>
          </span>
        }
      />
      <Tab
        eventKey="users"
        title={
          <span className="tab-title">
            <div>👥</div>
            <div className="d-none d-md-block">Usuarios</div>
          </span>
        }
      />
    </Tabs>
  );
}

export default TabNavegacionTres;
