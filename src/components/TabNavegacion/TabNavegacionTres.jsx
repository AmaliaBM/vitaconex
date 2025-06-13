import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

function TabNavegacionTres() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const currentPath = location.pathname.split('/')[1] || 'home';

  const handleSelect = (key) => {
    if (key === "home") {
      if (user?.role === "admin") {
        navigate("/home-admin");
      } else if (user?.role === "sanitario") {
        navigate("/home-medico");
      }
    } else {
      navigate(`/${key}`);
    }
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
        eventKey="informes"
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
