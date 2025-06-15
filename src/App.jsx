import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
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
import CitasPacientePage from "./pages/PacientePages/CitasPacientePage";
import { AuthProviderWrapper } from "./context/auth.context";
import ProtectedRoute from "./components/ProtectedRoute";

import './App.css';

function App() {
  return (
    <AuthProviderWrapper>
      <BrowserRouter>
        <div id="contenedor">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpFormPage />} />

              <Route path="/informes" element={<ProtectedRoute allowedRoles={["paciente", "sanitario"]}>
              <InformesPage />
              </ProtectedRoute>
                }/>

            {/* Rutas de paciente con layout persistente y rutas protegidas, se envuelve con la ruta de protección*/}
          <Route element={<ProtectedRoute allowedRoles={['paciente']} />}>
            <Route element={<LayoutPaciente />}>
            <Route path="/home" element={<HomePacientePage />} />
            <Route path="/journaling" element={<JournalingPage />} />
            <Route path="/citas-paciente" element={<CitasPacientePage />} />
             
            </Route>
          </Route>
            {/* Rutas de admin y médicos con layout persistente y rutas protegida, se envuelve con ruta protección*/}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'sanitario']} />}>
            <Route element={<LayoutAdminMed />}>
            <Route path="/home-admin" element={<HomeAdminPage />} />
            <Route path="/home-medico" element={<HomeSanitarioPage />} />
            <Route path="/citas" element={<CitasPage />} />
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
