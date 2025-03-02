import React from "react";

export default function Adestramento() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Adestramento</h1>
      <p className="mt-2 text-gray-600">
        Aqui você pode acessar dicas e orientações sobre adestramento do seu pet.
      </p>

      <div className="mt-6">
        <p className="text-lg font-semibold text-gray-700">Próximos Passos:</p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Escolher um curso de adestramento</li>
          <li>Acompanhar o progresso do seu pet</li>
          <li>Salvar e revisar aulas</li>
        </ul>
      </div>
    </div>
  );
}

