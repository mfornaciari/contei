module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest-dom/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "jest-dom"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-var": "error",
    "@typescript-eslint/array-type": ["error", {}],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-base-to-string": "off",
  },
};
