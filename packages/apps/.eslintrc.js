const path = require("path")

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
    'next',
  ],
  plugins: ['react', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx', '.jsx'],
      },
    ],
    'react/function-component-definition': [1, {
      namedComponents: 'arrow-function',
    }],
    semi: "off",
    quotes: "off",
    'no-plusplus': ["error", {
      allowForLoopAfterthoughts: true,
    }],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/extensions": ["error", "never"],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".tsx", ".ts"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: path.resolve(__dirname, "./tsconfig.json"),
      },
    },
  },
};
