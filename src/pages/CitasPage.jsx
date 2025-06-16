import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ListaCitas from "../components/ListaCitas/ListaCitas";
import AddFormCitas from "../components/AddFormCitas/AddFormCitas"; // importa el formulario

function CitasPage() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Cargando...</p>;

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
