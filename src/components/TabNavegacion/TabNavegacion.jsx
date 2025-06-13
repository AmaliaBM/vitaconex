import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useNavigate, useLocation } from 'react-router-dom';

function TabNavegacion() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split('/')[1] || 'home';

  const handleSelect = (key) => {
    navigate(`/${key}`);
  };

  return (
    <Tabs
      activeKey={currentPath}
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
