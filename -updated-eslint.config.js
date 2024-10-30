import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    rules: {
      // StandardJS rules
      indent: ['error', 2],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],
      semi: ['error', 'never'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-redeclare': 'error',
      eqeqeq: ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': [
        'error',
        { anonymous: 'always', named: 'never', asyncArrow: 'always' }
      ],
      'no-trailing-spaces': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true }
      ],
      'eol-last': ['error', 'always'],
      curly: ['error', 'all'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'prefer-const': [
        'error',
        { destructuring: 'all', ignoreReadBeforeAssign: true }
      ],
      'no-console': ['warn'],
      'no-extra-parens': ['error', 'functions'],
      'no-loop-func': 'error',
      'function-paren-newline': ['error', 'consistent'],

      // Custom rules
      'react/react-in-jsx-scope': 'off'
    }
  }
]
