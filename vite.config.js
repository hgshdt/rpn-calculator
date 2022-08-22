import { resolve } from 'path';
import { defineConfig } from 'vite';

module.exports = defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'rpn-calculator',
      fileName: (format) => `rpn-calculator.${format}.js`,
    },
  },
});
