import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "PetziApp", // TODO: Informar o nome do seu app
        short_name: "Petzia", // TODO: Informar o nome do seu app
        description: "Saúde animal", // TODO: Alterar a descrição
        theme_color: "#000000",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, // 🔥 Porta fixa para evitar mudança automática
    strictPort: true, // 🔒 Não muda a porta se estiver em uso
    open: true, // 🚀 Abre automaticamente no navegador ao rodar `npm run dev`
  },
});
