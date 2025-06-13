import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpFormPage from "./pages/SignUpFormPage/SignUpFormPage";
import HomePacientePage from "./pages/PacientePages/HomePacientePage";
import CitasPage from "./pages/PacientePages/CitasPage";
import JournalingPage from "./pages/PacientePages/JournalingPage";
import InformesPage from "./pages/PacientePages/InformesPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div id="contenedor">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpFormPage />} />
          <Route path="/home" element={<HomePacientePage />} />
          <Route path="/citas" element={<CitasPage />} />
          <Route path="/journaling" element={<JournalingPage />} />
          <Route path="/informes" element={<InformesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
