import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/firebase/firebaseConfig"; // ✅ Caminho corrigido
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function Lessons() {
  const { trackId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const querySnapshot = await getDocs(
        collection(db, "training_tracks", trackId, "lessons")
      );
      const lessonsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(lessonsList);
    };

    fetchLessons();
  }, [trackId]);

  const handleCompleteLesson = async (lessonId) => {
    if (!trackId) return; // Evita erro caso trackId seja inválido

    const user = auth.currentUser;
    if (!user) return; // Evita erro caso não tenha usuário autenticado

    const userProgressRef = doc(
      db,
      "users",
      user.uid, // ✅ Agora usa o ID do usuário autenticado
      "training_progress",
      trackId
    );

    setCompletedLessons([...completedLessons, lessonId]);
    await updateDoc(userProgressRef, { completedLessons });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lições</h1>
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className={`border p-4 my-2 rounded-lg ${
            completedLessons.includes(lesson.id) ? "bg-green-200" : "bg-gray-100"
          }`}
        >
          <h2 className="text-lg font-semibold">{lesson.title}</h2>
          <p className="text-sm text-gray-600">{lesson.description}</p>
          {lesson.imageUrl && (
            <img
              src={lesson.imageUrl}
              alt={lesson.title}
              className="w-full mt-2 rounded"
            />
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => handleCompleteLesson(lesson.id)}
          >
            Concluir
          </button>
        </div>
      ))}
    </div>
  );
}

