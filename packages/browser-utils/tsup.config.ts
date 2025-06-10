import { defineConfig } from 'tsup'

// 输出的产物可以适配多种不同的模块化规范：commonjs、esm、umd
export default defineConfig([
    {
        entry: ['src'],
        format: ['cjs'],
        outDir: 'build/cjs',
    },
    {
        entry: ['src'],
        format: ['esm'],
        outDir: 'build/esm',
    },
    {
        entry: ['src'],
        format: ['iife'],
        outDir: 'build/umd',
        name: 'next-monitor-sdk-browser-utils',
    },
])
