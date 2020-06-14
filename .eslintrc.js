module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'functional'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:functional/external-recommended",
    "plugin:functional/lite"
  ],
  rules: {
    "indent": ["warn", 2],
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "functional/no-this-expression": "off",
    "functional/no-throw-statement": "off"
  }
};
