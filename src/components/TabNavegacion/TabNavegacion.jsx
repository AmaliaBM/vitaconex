import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useNavigate, useLocation } from 'react-router-dom';

function TabNavegacion() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  let activeKey = "";
  if (path.includes("home")) {
    activeKey = "home";
  } else if (path.includes("journaling")) {
    activeKey = "journaling";
  } else if (path.includes("informes")) {
    activeKey = "informes";
  }

  const handleSelect = (key) => {
    navigate(`/${key}`);
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
      {/* Se quita la pestaña Citas para paciente */}
      <Tab
        eventKey="journaling"
        title={
          <span className="tab-title">
            <div>❤️</div>
            <div className="d-none d-md-block">Mi diario</div>
          </span>
        }
      />
      <Tab
        eventKey="informes"
        title={
          <span className="tab-title">
            <div>📄</div>
            <div className="d-none d-md-block">Informes</div>
          </span>
        }
      />
    </Tabs>
  );
}

export default TabNavegacion;