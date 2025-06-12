import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from './pages/LoginPage/LoginPage'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div id="contenedor">
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
