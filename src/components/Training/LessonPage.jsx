import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/firebaseConfig"; // ✅ Caminho corrigido
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Button } from "../../shadcn/components/ui/button";

export default function LessonPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      const lessonRef = doc(db, "lessons", lessonId);
      const lessonSnap = await getDoc(lessonRef);
      if (lessonSnap.exists()) {
        setLesson(lessonSnap.data());
      }
    };

    fetchLesson();
  }, [lessonId]);

  const markAsCompleted = async () => {
    const user = auth.currentUser;
    if (!user) return; // ✅ Evita erro caso não tenha usuário autenticado

    const userRef = doc(db, "users_progress", user.uid);
    await updateDoc(userRef, {
      completed_lessons: arrayUnion(lessonId),
    });

    navigate("/training");
  };

  if (!lesson) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">{lesson.title}</h2>
      <img src={lesson.image} alt={lesson.title} className="rounded-lg mt-4 w-full" />
      <p className="mt-2">{lesson.description}</p>
      <Button onClick={markAsCompleted} className="mt-4">
        Marcar como Concluído
      </Button>
    </div>
  );
}


/*
✔ O que esse código faz?
✅ Obtém o ID da lição pelo useParams().
✅ Busca os dados da lição no Firestore (título, descrição e imagem).
✅ Exibe a lição completa.
✅ Tem um botão "Marcar como Concluído" que salva no Firestore.
*/