import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { getUniqueId } from "@/utils/getUniqueId";
import ReactPixel from "react-facebook-pixel";
import { getCookie } from "@/utils/getCookie";
import { messaging } from "./firebase/firebaseConfig";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useFirestore } from "./hooks/useFirestore";
import { useAuthContext } from "./hooks/useAuthContext";
import { useToast } from "./shadcn/components/ui/use-toast";
import { ToastAction } from "./shadcn/components/ui/toast";
import { useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";


// ✅ Importando serviço de notificações
import { requestNotificationPermission } from "./services/NotificationService.js";

// ✅ Importando serviço de notificações agendadas
import { checkUserProgressAndNotify } from "./services/NotificationScheduler.js";

// ✅ Importando componentes do treinamento (Sem alterar o resto do código)
import LessonsList from "./components/Training/LessonsList";
import TrainingLesson from "./components/Training/TrainingLesson";
import TrainingTracks from "./pages/adestramento/TrainingTracks";

function App() {
  const { user } = useAuthContext();

  // ✅ Chamando a permissão para notificações ao iniciar o app
  useEffect(() => {
    requestNotificationPermission();
    checkUserProgressAndNotify(); // ✅ Verifica progresso e notifica usuário se necessário

    // ✅ Registra o Service Worker sem modificar o resto do código
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registrado:", registration);
        })
        .catch((err) => {
          console.error("❌ Erro ao registrar Service Worker:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (user?.uid !== "h1SKqzfs39X7UAgPlkDrnXbRrhy2") return;
  }, []);

  return (
    <Router>
      <AppRoutes />
      <Routes>
        <Route path="/training" element={<TrainingTracks />} />
        <Route path="/training/:trackId" element={<LessonsList />} />
        <Route path="/lesson/:trackId/:lessonId" element={<TrainingLesson />} />
      </Routes>
    </Router>
  );
}

export default App;
