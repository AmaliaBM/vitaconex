import { useState } from "react";
import AddFormJournaling from "../../components/AddFormJournaling/AddFormJournaling";
import ListaJournaling from "../../components/ListaJournaling/ListaJournaling";

function JournalingPage() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📘 Mi Diario Personal</h2>
      <p className="text-muted text-center">
        Aquí puedes escribir cómo te sientes y revisar tus entradas anteriores.
      </p>

      <AddFormJournaling onEntrySaved={triggerRefresh} />

      <hr className="my-5" />

      <ListaJournaling refresh={refresh} onRefresh={triggerRefresh} /> 
    </div>
  );
}

export default JournalingPage;