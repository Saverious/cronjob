import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/lib/cron.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true
});