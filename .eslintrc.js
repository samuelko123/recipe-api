module.exports = {
    root: true,
    env: {
        node: true,
    },
    rules: {
        eqeqeq: ['error', 'always'],
        curly: 'error',
        quotes: ['error', 'single', {
            avoidEscape: true,
            allowTemplateLiterals: true,
        }],
        semi: ['error', 'never'],
        'no-console': 'warn',
        'no-var': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', {
            argsIgnorePattern: '^(next|_)$',
        }],
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-explicit-any': ['error', {
            fixToUnknown: true
        }],
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    ignorePatterns: ['node_modules/*', 'dist/*', '*.d.ts'],
};