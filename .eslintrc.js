module.exports = {
    root: true,
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true,
      jquery: true,
      jest: true,
      amd: true,
      'vue/setup-compiler-macros': true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
    ],
    parserOptions: {
      // "parser": 'babel-eslint',
      ecmaVersion: 2020,
      sourceType: 'module',
      allowImportExportEverywhere: true,
    },
  
    rules: {
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": 4
        },
      }],
      'no-console': 'warn',
      "vue/no-multiple-template-root": "off"
    }
  };
  