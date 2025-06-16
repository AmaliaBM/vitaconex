import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import LayoutPaciente from "../components/Layout/LayoutPaciente";
import LayoutAdminMed from "../components/Layout/LayoutAdminMed";
import ListaCitas from "../components/ListaCitas/ListaCitas";

function CitasPage() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Cargando...</p>;

  const Content = (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Citas Programadas</h2>
      <ListaCitas />
    </div>
  );

  if (user.role === "paciente") {
    return <LayoutPaciente>{Content}</LayoutPaciente>;
  }

  if (user.role === "sanitario" || user.role === "admin") {
    return <LayoutAdminMed>{Content}</LayoutAdminMed>;
  }

  return <p>No autorizado.</p>;
}

export default CitasPage;