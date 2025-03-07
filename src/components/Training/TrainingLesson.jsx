import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import TrainingCarousel from "./TrainingCarousel";
import { Button } from "../../shadcn/components/ui/button";

export default function TrainingLesson() {
  const { trackId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      const lessonRef = doc(db, "training_tracks", trackId, "lessons", lessonId);
      const lessonSnap = await getDoc(lessonRef);

      if (lessonSnap.exists()) {
        setLesson(lessonSnap.data());
      } else {
        console.error("Lição não encontrada no Firestore.");
      }
    };

    fetchLesson();
  }, [trackId, lessonId]);

  if (!lesson) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <TrainingCarousel lesson={lesson} onComplete={() => navigate(`/training/${trackId}`)} />
    </div>
  );
}
``
