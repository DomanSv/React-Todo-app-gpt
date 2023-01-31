import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const baseConfig = {
    plugins: [
      react(),
      eslint(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    envPrefix: "REACT_APP",
    server: {
      host: true,
      port: 3000,
      strictPort: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
    },
  };

  if (env.REACT_APP_DOCKER_RUN === "true") {
    return baseConfig;
  }

  return {
    ...baseConfig,
    server: {
      ...baseConfig.server,
      open: "/",
    },
  };
});
