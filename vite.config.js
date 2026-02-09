import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
    // ✅ Gzip compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Only compress files > 10KB
      algorithm: 'gzip',
      ext: '.gz',
    }),
    
    // ✅ Brotli compression (better than gzip)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    
    // ✅ Bundle analyzer (only in production builds)
    visualizer({
      open: process.env.ANALYZE === 'true', // Only open when analyzing
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html', // Save inside dist folder
    }),
  ],
  
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // ✅ Run compression twice for better results
      },
      mangle: {
        safari10: true, // ✅ Fix Safari 10/11 bugs
      },
    },
    
    rollupOptions: {
      output: {
        // ✅ Smart chunking with function
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Monaco Editor (if you add it later)
            if (id.includes('monaco-editor') || id.includes('@monaco-editor')) {
            return 'monaco-editor';
            }
            // Framer m
            if (id.includes('framer-motion')) {
              return 'framer';
            }
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Analytics
            if (id.includes('@vercel/analytics')) {
              return 'analytics';
            }
            // Axios (if still using)
            if (id.includes('axios')) {
              return 'axios';
            }
            // Everything else
            return 'vendor';
          }
        },
        
        // ✅ Better asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2|eot|ttf|otf/.test(extType)) {
            extType = 'fonts';
          } else if (/css/.test(extType)) {
            extType = 'css';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    chunkSizeWarningLimit: 1000, // Warn if chunks exceed 1MB
    sourcemap: false, // Disable in production
    reportCompressedSize: true, // Show compressed sizes
    cssCodeSplit: true, // Split CSS into separate files
    
    // ✅ Modern browser targets for smaller builds
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  
  // ✅ Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
    exclude: ['@vercel/analytics'], // Don't pre-bundle analytics
  },
  
  server: {
    port: 3000,
    open: true,
    host: true,
    // ✅ Add cors for API calls
    cors: true,
  },
  
  preview: {
    port: 4173,
    open: true,
    host: true,
  },
});
import { useState, useEffect } from "react";