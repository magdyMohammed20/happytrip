import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mkcert from "vite-plugin-mkcert";
import {
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetIcons from "@unocss/preset-icons";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    https: true,
    port: 9000,
  },
  plugins: [
    UnoCSS({
      presets: [
        presetUno(),
        presetIcons({
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
          },
        }),
      ],
      theme: {
        breakpoints: {
          sm: "60px", // from 60 to 550
          // => @media (min-width: 640px) { ... }

          md: "550px",
          // => @media (min-width: 768px) { ... }

          lg: "992px",
          // => @media (min-width: 1024px) { ... }

          xl: "1280px",
          // => @media (min-width: 1280px) { ... }

          "2xl": "1536px",
          // => @media (min-width: 1536px) { ... }
        },
      },
      rules: [
        // your custom rules
      ],
    }),
    mkcert(),
    vueJsx(),
    vue(),
  ],
  // css config for asstes/style/index.scss

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      cmp: fileURLToPath(new URL("./src/components", import.meta.url)),
      "~/": `${pathSrc}/`,
    },
  },
  publicDir: "src/assets",
  build :{
    outDir: "dist",
    assetsDir: "assets",
    manifest: true,
  },
});
