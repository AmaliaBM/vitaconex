import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFound from './pages/ErrorPages/NotFound';
import Denegado from "./pages/ErrorPages/Denegado403";
import Error500 from "./pages/ErrorPages/Error500";
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpFormPage from "./pages/SignUpFormPage/SignUpFormPage";
import HomePacientePage from "./pages/PacientePages/HomePacientePage";
import HomeSanitarioPage from "./pages/SanitariosPages/HomeSanitarioPage";
import CitasPage from "./pages/CitasPage";
import UsuariosPage from "./pages/UsuariosPage";
import JournalingPage from "./pages/PacientePages/JournalingPage";
import InformesPage from "./pages/InformesPage";
import LayoutAdminMed from "./components/Layout/LayoutAdminMed";
import LayoutPaciente from "./components/Layout/LayoutPaciente";
import HomeAdminPage from "./pages/AdminPages/HomeAdminPage";
import DetalleUsuarioPage from "./pages/AdminPages/DetalleUsuarioPage";
import DetallePacientePage from "./pages/SanitariosPages/DetallePacientePage";
import InfoProyectoPage from "./pages/InfoProyectoPage/InfoProyectoPage";
import AboutPage from "./pages/About/About";
import { AuthProviderWrapper } from "./context/auth.context";
import ProtectedRoute from "./components/ProtectedRoute";

import './App.css';

function App() {
  return (
    <AuthProviderWrapper>
      <BrowserRouter>
        <div id="contenedor">
          <Routes>

            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpFormPage />} />
            <Route path="/info-proyecto" element={<InfoProyectoPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<NotFound />} />
            <Route path="/denegado" element={<Denegado />} />
            <Route path="/error-500" element={<Error500 />} />

            {/* RUTAS PACIENTE */}
           <Route element={<ProtectedRoute allowedRoles={['paciente']} />}>
          <Route element={<LayoutPaciente />}>
            <Route path="/home" element={<HomePacientePage />} />
            <Route path="/journaling" element={<JournalingPage />} />
            <Route path="/informes" element={<InformesPage />} />
            {/* Ya no ponemos /citas aquí */}
          </Route>
        </Route>

            {/* RUTAS SANITARIO */}
            <Route element={<ProtectedRoute allowedRoles={['sanitario']} />}>
              <Route element={<LayoutAdminMed />}>
                <Route path="/home-medico" element={<HomeSanitarioPage />} />
                <Route path="/informes" element={<InformesPage />} />
                <Route path="/paciente/:id" element={<DetallePacientePage />} />
              </Route>
            </Route>

            {/* RUTAS ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<LayoutAdminMed />}>
              <Route path="/home-admin" element={<HomeAdminPage />} />
              <Route path="/admin/usuarios/:userId" element={<DetalleUsuarioPage />} />
              </Route>
            </Route>

          {/* RUTA COMPARTIDA PARA ADMIN Y SANITARIO */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'sanitario']} />}>
            <Route element={<LayoutAdminMed />}>
              <Route path="/citas" element={<CitasPage />} />
              </Route>
               <Route element={<LayoutAdminMed />}>
              <Route path="/usuariospage" element={<UsuariosPage />} />
              </Route>
                </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProviderWrapper>
  );
}

export default App;


