import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/auth": `http://${env.VITE_SERVER_URL}:${env.VITE_SERVER_PORT}`,
        "/contei": {
          target: `ws://${env.VITE_SERVER_URL}:${env.VITE_SERVER_PORT}`,
          ws: true,
        },
      },
    },
  });
};
