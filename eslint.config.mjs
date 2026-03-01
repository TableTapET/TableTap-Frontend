import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig([
    // Next.js recommended rules
    ...nextVitals,

    // Global ignores (override / extend defaults)
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'dist/**',
        'coverage/**',
        'node_modules/**',
    ]),

    // Your project-specific rules (applied on top)
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            // Prevents the exact error you hit. Duplicate imports = broken modules.
            'no-duplicate-imports': 'error',

            // Blocks redefining variables, functions, or imports. Redefinition = bugs you won’t notice until runtime.
            'no-redeclare': 'error',

            // Forces removal of dead variables. Dead code hides real mistakes and bloats the project.
            'no-unused-vars': [
                'warn',
                { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
            ],

            // Stops using variables that don’t exist. Typos turn into runtime crashes without this.
            'no-undef': 'error',

            // Flags unreachable code. Unreachable = your logic is wrong.
            'no-unreachable': 'error',

            // Detects loops that never run properly. Usually caused by sloppy refactoring.
            'no-unreachable-loop': 'warn',

            // Prevents accidental fallthrough in switch statements. Fallthrough is almost always a bug.
            'no-fallthrough': 'error',

            // Blocks debugger from leaking into production. If this makes it to prod, you weren’t paying attention.
            'no-debugger': 'error',

            // Warns when console logs are left behind. Keeps production clean.
            'no-console': 'warn',

            // Forces strict equality. Loose equality creates unpredictable coercion bugs.
            eqeqeq: 'error',

            // Disallows async inside Promise constructors. If you're doing this, you're misusing Promises.
            'no-async-promise-executor': 'error',

            // Prevents sequential await inside loops. Kills performance and usually not intended.
            'no-await-in-loop': 'warn',

            // Safer object property checks. Some objects don’t inherit hasOwnProperty — this rule avoids crashes.
            'no-prototype-builtins': 'error',

            // Prevents using things before they're defined. Classic source of runtime errors.
            'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

            // Forces braces. Prevents subtle bugs from misleading indentation.
            curly: 'error',

            // This integrates Prettier formatting issues as ESLint errors
            'prettier/prettier': 'error',
        },
    },
    // Jest globals for test files
    {
        files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.{test,spec}.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: globals.jest,
        },
    },

    eslintConfigPrettier, // MUST be last to override everything else
]);
