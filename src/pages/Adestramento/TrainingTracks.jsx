import { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebaseConfig"; // ✅ Caminho corrigido
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function TrainingTracks() {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "training_tracks"));
        const tracksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTracks(tracksList);
      } catch (error) {
        console.error("Erro ao buscar trilhas de adestramento:", error);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trilhas de Adestramento</h1>
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <div
            key={track.id}
            className="border p-4 my-2 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/training/${track.id}`)}
          >
            <h2 className="text-lg font-semibold">{track.title}</h2>
            <p className="text-sm text-gray-600">{track.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Nenhuma trilha encontrada.</p>
      )}
    </div>
  );
}
