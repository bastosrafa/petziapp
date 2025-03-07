import { useEffect, useState } from "react";
import { db, auth } from "@/firebase/firebaseConfig"; // ✅ Mantendo os imports do Firebase
import { collection, getDocs } from "firebase/firestore";
import useProgress from "../../hooks/useProgress"; // ✅ Importando o hook de progresso

export default function Progress() {
  const progress = useProgress(); // ✅ Agora usamos o hook para buscar os dados

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seu Progresso</h1>
      {progress.completedLessons?.length > 0 ? (
        progress.completedLessons.map((lesson, index) => (
          <div key={index} className="border p-4 my-2 rounded-lg">
            <h2 className="text-lg font-semibold">Lição {lesson}</h2>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Nenhum progresso registrado.</p>
      )}
    </div>
  );
}
