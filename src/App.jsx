import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpFormPage from "./pages/SignUpFormPage/SignUpFormPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div id="contenedor">
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/signup" element={<SignUpFormPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
