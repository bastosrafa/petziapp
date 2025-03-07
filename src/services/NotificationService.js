import { messaging, getToken, onMessage } from "../firebase/firebaseConfig";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "xx", // ✅ Chave VAPID inserida corretamente
      });
      console.log("Token de Notificação:", token);
      return token;
    } else {
      console.log("Permissão de Notificação negada");
    }
  } catch (error) {
    console.error("Erro ao solicitar permissão de notificação:", error);
  }
};

// Ouve notificações enquanto o app está aberto
onMessage(messaging, (payload) => {
  console.log("Notificação Recebida:", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png",
  });
});

