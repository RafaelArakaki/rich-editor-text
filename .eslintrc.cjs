module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "import/no-unresolved": ["error", { "ignore": ["\\.svg\\?react$"] }],
    'max-len': ['error', { code: 120 }],
    'jsx-a11y/control-has-associated-label': 'off',
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/extensions": ["error", "ignorePackages", {
      "js": "never",
      "mjs": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never",
      "json": "always"
    }],
    "linebreak-style": ["error", "unix"],
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
    "react/prop-types": "off"
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'import/prefer-default-export': 'off',
        'linebreak-style':0,
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@uroot', './src'],
          ['@utypes', './src/types'],
          ['@ucomponents', './src/components'],
          ['@uassets', './src/assets'],
          ['@uservices', './src/services'],
          ['@uutypes', './types'],
          ['@uhelpers', './src/helpers'],
          ['@ulayouts', './src/layouts'],
          ['@upages', './src/pages'],
          ['@uroutes', './src/routes'],
          ['@uutils', './src/utils'],
          ['@uredux', './src/redux'],
          ['@ulocales', './src/locales'],
        ],
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      }
    }
  }
}
