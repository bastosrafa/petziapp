import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig"; // ✅ Firebase configurado corretamente
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent } from "../../shadcn/components/ui/card";
import useProgress from "../../hooks/useProgress"; // ✅ Obtém progresso do usuário

export default function LessonsList() {
  const { trackId } = useParams(); // Obtém o ID da trilha selecionada
  const [lessons, setLessons] = useState([]); // Estado para armazenar as lições
  const progress = useProgress(); // ✅ Obtendo progresso do usuário
  const navigate = useNavigate(); // Para navegação entre páginas

  useEffect(() => {
    const fetchLessons = async () => {
      const lessonsRef = collection(db, "training_tracks", trackId, "lessons");
      const snapshot = await getDocs(lessonsRef);
      const lessonsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(lessonsList);
    };

    fetchLessons();
  }, [trackId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Lições de Adestramento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className={`cursor-pointer ${
              progress.completedLessons?.includes(lesson.id) ? "opacity-50" : ""
            }`}
            onClick={() => navigate(`/lesson/${trackId}/${lesson.id}`)} // ✅ Correção do link para a lição correta
          >
            <CardContent>
              <img src={lesson.image} alt={lesson.title} className="rounded-lg w-full" />
              <h3 className="text-lg font-bold mt-2">{lesson.title}</h3>
              {progress.completedLessons?.includes(lesson.id) && (
                <span className="text-green-500 font-bold">✔️ Concluído</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

