
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
        title={<span>🏠 <span className="d-none d-md-inline">Inicio</span></span>}
      />
      <Tab
        eventKey="citas"
        title={<span>📅 <span className="d-none d-md-inline">Citas</span></span>}
      />
      <Tab
        eventKey="journaling"
        title={<span>❤️ <span className="d-none d-md-inline">Mi diario</span></span>}
      />
      <Tab
        eventKey="informes"
        title={<span>📄 <span className="d-none d-md-inline">Informes</span></span>}
      />
    </Tabs>
  );
}

export default TabNavegacion;
