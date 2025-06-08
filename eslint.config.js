const eslint = require('@eslint/js')
const globals = require('globals')
const tseslint = require('typescript-eslint')
const eslintPluginPrettier = require('eslint-plugin-prettier')
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort')
const eslintPluginReactHooks = require('eslint-plugin-react-hooks')
const eslintPluginReactRefresh = require('eslint-plugin-react-refresh')

const ignores = [
    'dist',
    'build',
    '**/*.js',
    '**/*.mjs',
    '**/*.d.ts',
    'eslint.config.js',
    'commitlint.config.js',
    'apps/frontend/monitor/src/components/ui/**/*',
    'packages/browser-utils/src/metrics/**/*',
]

const frontendMonitorConfig = {
    files: ['apps/frontend/monitor/**/*.{ts,tsx}'],
    ignores: ['apps/frontend/monitor/src/components/ui/**/*'],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    plugins: {
        'react-hooks': eslintPluginReactHooks,
        'react-refresh': eslintPluginReactRefresh,
    },
    rules: {
        ...eslintPluginReactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'no-console': 'error',
    },
}

const backendMonitorConfig = {
    files: ['apps/backend/**/*.ts'],
    languageOptions: {
        globals: {
            ...globals.node, // global
            ...globals.jest,
        },
        parser: tseslint.parser,
    },
    rules: {
        // nestjs 官方推荐配置
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'error',
    },
}

module.exports = tseslint.config(
    {
        // 忽略的文件
        ignores,
        // 集成eslint和tseslint的推荐配置
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
        plugins: {
            prettier: eslintPluginPrettier,
            'simple-import-sort': eslintPluginSimpleImportSort,
        },
        rules: {
            'prettier/prettier': 'error',
            'simple-import-sort/imports': 'error',
        },
    },
    // 针对前端项目的eslint配置
    frontendMonitorConfig,
    // 针对后端项目的eslint配置
    backendMonitorConfig
)
