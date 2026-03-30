import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  test: {
    include: ['tests/unit/**/*.test.js'],
  },
  worker: {
    format: 'es',
  },
  server: {
    host: '127.0.0.1',
    port: 4173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
});
