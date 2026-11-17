import firebaseRulesPlugin from "@firebase/eslint-plugin-security-rules";

export default [
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      "out/**",
      "**/*.js",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx",
      "**/*.mjs",
    ],
  },
  firebaseRulesPlugin.configs["flat/recommended"],
];
