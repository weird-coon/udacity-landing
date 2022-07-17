/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

const eslintConfig = {
  fix: true,
};

export default defineConfig({
  plugins: [eslint(eslintConfig)],
});
