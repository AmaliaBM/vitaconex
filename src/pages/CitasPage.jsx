import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ListaCitas from "../components/ListaCitas/ListaCitas";
import AddFormCitas from "../components/AddFormCitas/AddFormCitas"; // importa el formulario
import SpinnerButton from "../components/SpinnerButton/SpinnerButton";

function CitasPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <SpinnerButton />
      <p className="mt-3">Estamos verificando tu información de usuario, si pasado unos minutos no carga nada, por favor, contacta con soporte.</p>
    </div>
  );
}

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Citas Programadas</h2>

      {/* Solo mostrar el formulario si es admin */}
      {user.role === "admin" && <AddFormCitas />}

      <ListaCitas />
    </div>
  );
}

export default CitasPage;
