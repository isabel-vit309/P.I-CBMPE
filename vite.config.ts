import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "SIGO",
        short_name: "SIGO",
        description:
          "Aplicação de Sistema Integrado de Gerenciamento de Ocorrências",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1a73e8",
        icons: [
          { src: "icon-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512x512", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {},
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
