import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            // Использовать arrow functions вместо function declarations
            'func-style': [
                'error',
                'expression',
                { allowArrowFunctions: true },
            ],
            // Обязательные фигурные скобки для всех условных конструкций
            curly: ['error', 'all'],
        },
    },
];

export default eslintConfig;
