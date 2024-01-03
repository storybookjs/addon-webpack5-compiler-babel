import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/preset.ts"],
  format: ["esm", "cjs"],
  target: ["es2022"],
  splitting: false,
  sourcemap: true,
  treeshake: true,
  clean: true,
});
