module.exports = {
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended', // Make sure this is last
    ],
    plugins: ['react', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off', // Next.js doesn't require it
        'prettier/prettier': 'warn',
    },
};
