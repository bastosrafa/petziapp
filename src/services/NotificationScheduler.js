import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const checkUserProgressAndNotify = async () => {
  if (!auth.currentUser) return;

  const userRef = doc(db, "users_progress", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const progress = userSnap.data();

    // Última data de conclusão de uma lição
    const lastLessonDate = progress.last_completed_date || 0;
    const daysSinceLastLesson = (Date.now() - lastLessonDate) / (1000 * 60 * 60 * 24);

    // Se passaram mais de 3 dias sem concluir uma lição, enviar notificação
    if (daysSinceLastLesson > 3) {
      new Notification("Ei! Vamos continuar o adestramento?", {
        body: "Seu cão está esperando por você! Continue sua trilha no Petzia 🐶",
        icon: "/logo.png",
      });
    }
  }
};
