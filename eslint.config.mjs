import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Netlify writes its bundled server handler here on every deploy. Linting
    // generated output produces a wall of warnings about code nobody wrote and
    // nobody can fix, which is exactly how a lint command stops being read.
    ".netlify/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
