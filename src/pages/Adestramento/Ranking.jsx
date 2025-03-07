import { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig"; // ✅ Caminho corrigido
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { Card, CardContent } from "../../shadcn/components/ui/card";
import { Avatar, AvatarImage } from "../../shadcn/components/ui/avatar";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("points", "desc"), limit(10));
      const querySnapshot = await getDocs(q);

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      setRanking(users);
    };

    fetchRanking();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🏆 Ranking de Tutores</h1>
      {ranking.map((user, index) => (
        <Card key={user.id} className="flex items-center p-4 space-x-4">
          <Avatar>
            <AvatarImage src={user.photoUrl} alt={user.name} />
          </Avatar>
          <CardContent>
            <CardTitle>{index + 1}. {user.name}</CardTitle>
            <p className="text-sm text-gray-600">Pontos: {user.points}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
