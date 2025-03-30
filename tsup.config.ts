import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  clean: true,
  dts: true,
  bundle: true,
  minify: true,
  loader: {
    '.css': 'text',
  }
});
