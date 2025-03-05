import useProgress from "../../hooks/useProgress"; // ✅ Importando o hook de progresso

export default function Profile() {
  const progress = useProgress(); // ✅ Obtendo os dados do progresso do usuário

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Meu Progresso</h2>
      <p className="mt-2">Pontos: {progress.points ?? 0}</p>
      <p>Nível: {Math.floor((progress.points ?? 0) / 100)}</p>
    </div>
  );
}
