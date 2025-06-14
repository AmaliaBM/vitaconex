import ListaCitas from "../components/ListaCitas/ListaCitas"

function CitasPage() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Citas Programadas</h2>
      <ListaCitas />
    </div>
  );
}

export default CitasPage;