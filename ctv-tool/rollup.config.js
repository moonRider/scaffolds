// packages/lib/rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';


const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig([{
  input: './src/index.tsx',
  context: 'window',
  output:
    [
      {
        format: 'umd',
        name: 'component',
        file: './dist/bundle.umd.js',
        sourcemap: 'inline',
        globals: {
          react: 'React',
          'styled-components': 'styled',
          echarts: 'echarts',
        }
      },
      {
        format: 'esm',
        file: './dist/bundle.esm.js',
        sourcemap: true
      }
    ],
    plugins: [
      terser(),
      resolve(),
      commonjs(),
      typescript(),
      clear({
        targets: ['dist']
      }),
      isDev && serve({
        open: false,
        contentBase: 'dist',
        port: 3005,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Method': '*',
        },
      }),
    ],
    external: [
      'react',
      'react-dom',
      'styled-components',
      'zustand',
      'echarts',
      'antd',
      'lodash',
      'zustand/middleware/immer',
      'axios',
      'crypto-js',
      'moment',
      'classnames',
    ],
  },
]);