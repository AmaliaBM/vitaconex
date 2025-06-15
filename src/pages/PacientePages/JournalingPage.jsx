import ListaJournaling from "../../components/ListaJournaling/ListaJournaling";

function JournalingPage() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📘 Mi Diario Personal</h2>
      <p className="text-muted text-center">Aquí puedes ver tus entradas registradas</p>
      <ListaJournaling />
    </div>
  );
}

export default JournalingPage;