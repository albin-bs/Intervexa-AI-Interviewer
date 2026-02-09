import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // ✅ Gzip compression
    viteCompression({
      verbose: true,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),

    // ✅ Brotli compression
    viteCompression({
      verbose: true,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br",
    }),

    // ✅ Bundle analyzer (only when ANALYZE=true)
    visualizer({
      open: process.env.ANALYZE === "true",
      gzipSize: true,
      brotliSize: true,
      filename: "dist/stats.html",
    }),
  ],

  // ✅ PATH ALIAS (THIS FIXES SHADCN + MAGICUI)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            )
              return "react-vendor";
            if (id.includes("framer-motion")) return "framer";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("@vercel/analytics")) return "analytics";
            if (id.includes("axios")) return "axios";
            return "vendor";
          }
        },

        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();

          if (/png|jpe?g|svg|gif|webp/i.test(ext))
            return "assets/img/[name]-[hash][extname]";
          if (/woff2?|ttf|otf|eot/i.test(ext))
            return "assets/fonts/[name]-[hash][extname]";
          if (/css/i.test(ext))
            return "assets/css/[name]-[hash][extname]";

          return "assets/[name]-[hash][extname]";
        },

        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },

    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    reportCompressedSize: true,
    cssCodeSplit: true,
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion"],
    exclude: ["@vercel/analytics"],
  },

  server: {
    port: 3000,
    open: true,
    host: true,
    cors: true,
  },

  preview: {
    port: 4173,
    open: true,
    host: true,
  },
});
