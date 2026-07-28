import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT || "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH || "/";

const plugins = [
  react(),
  tailwindcss(),
  runtimeErrorOverlay(),
];

// Conditionally add Replit plugins if in dev and in Replit
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  try {
    const cartographerPlugin = require("@replit/vite-plugin-cartographer");
    plugins.push(
      cartographerPlugin.cartographer({
        root: path.resolve(import.meta.dirname, ".."),
      })
    );
  } catch (e) {
    // Silently fail if plugin not available
  }
  
  try {
    const devBannerPlugin = require("@replit/vite-plugin-dev-banner");
    plugins.push(devBannerPlugin.devBanner());
  } catch (e) {
    // Silently fail if plugin not available
  }
}

export default defineConfig({
  base: basePath,
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
