/** @type {import("prettier").Config} */
module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  semi: false,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'all',
  arrowParens: 'avoid',
  endOfLine: 'lf',
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]',
  ],
}
