module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json"
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "rules": {
    "comma-dangle": ["error", "always-multiline"],
    "max-lines": [1, 300],
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "*", "next": "return" },
      { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*" },
      { "blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"] }
    ],
    "max-len": [
      "error",
      {
        "code": 120,
        "tabWidth": 2,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "sort-keys": ["error", "asc", { "caseSensitive": true, "natural": false, "minKeys": 2 }],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "prefer-promise-reject-errors": [1],
    "no-nested-ternary": [1],
    "no-useless-escape": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-unused-vars": "off",
    "import/prefer-default-export": "off",
    "import/no-webpack-loader-syntax": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "ignoreRestSiblings": true,
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};
