import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig"; // ✅ Caminho corrigido
import { doc, getDoc } from "firebase/firestore";

export default function useProgress() {
  const [progress, setProgress] = useState({ completedLessons: [], points: 0 });

  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (!user) return; // ✅ Evita erro caso o usuário não esteja autenticado

      const userRef = doc(db, "users_progress", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setProgress(userSnap.data());
      }
    };

    fetchProgress();
  }, []);

  return progress;
}
