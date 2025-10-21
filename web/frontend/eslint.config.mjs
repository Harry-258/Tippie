// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // ✅ Keep your existing Next.js base config
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    // 🧹 Ignore generated / build files
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
        ],
    },

    // 🧠 Main rule set
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                React: 'writable',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            jsdoc,
        },
        rules: {
            /* 📚 Require documentation on functions/classes */
            'jsdoc/require-jsdoc': [
                'error',
                {
                    publicOnly: true,
                    require: {
                        FunctionDeclaration: true,
                        ClassDeclaration: true,
                        MethodDefinition: true,
                        ArrowFunctionExpression: true,
                    },
                },
            ],
            'jsdoc/require-param': 'warn',
            'jsdoc/require-returns': 'warn',

            /* 🧹 Code style */
            'max-len': ['error', { code: 100, ignoreUrls: true }],
            indent: ['error', 2],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],

            /* 🚫 Clean code rules */
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn'],

            /* 🧠 TS-specific rules */
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',

            /* 🪶 Prettier formatting */
            ...prettier.rules,
        },
        settings: {
            jsdoc: {
                mode: 'typescript',
            },
        },
    },
];

export default eslintConfig;
