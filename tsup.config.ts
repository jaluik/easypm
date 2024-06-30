import { defineConfig } from 'tsup';

export default defineConfig((option) => ({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: !option.watch,
  target: 'node16',
  dts: true,
  treeshake: true,
  clean: true,
}));
