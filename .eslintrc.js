module.exports = {
  extends: [
    "universe/native",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["simple-import-sort", "@typescript-eslint"],
  rules: {
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^expo", "^react"], ["^@?\\w"], ["@/(.*)"], ["^[./]"]], // sort order for imports
      },
    ],
    "import/order": ["off"], // keeping default rule off and replaced with simple import sort
    "import/newline-after-import": ["error", { count: 1 }], // new line after all the imports
    "padding-line-between-statements": [
      // blank line between statements
      "error",
      { blankLine: "always", prev: ["export", "function"], next: "*" },
      { blankLine: "always", prev: "*", next: ["export", "function"] },
    ],
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-var-requires": "off",
    "no-console": ["error", { allow: ["warn", "error"] }], // allow console.warn and console.error
    "no-alert": "error", // no alert
    "no-debugger": "error", // no debugger
    "no-unused-vars": "error", // no unused vars
    "no-duplicate-imports": "error", // no duplicate imports"
  },
};
