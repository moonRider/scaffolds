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
        // umd 格式的文件必须要具备哦，目前宿主只支持 umd 和 iife 规范
        // 推荐使用 iife
        format: 'iife',
        // 挂载的全局变量名，支持 namespace（通过 namespace.xxx)
        // 推荐使用 CustomComponents 作为 namespace
        name: 'CustomComponents.test',
        file: './dist/bundle.iife.js',
        sourcemap: isDev ? 'inline' : 'hidden',
        /**
         * 需要宿主提供的依赖，其中 React 必须由宿主提供，否则数据响应会丢失
         * 宿主提供了
         * [依赖名]:[全局变量名]
         * react: React
         * react-dom: ReactDOM
         * styled-components: styled
         * axios: axios
         * echarts: echarts
         * lodash: _
         * classnames: classnames
         * zustand: zustand
         * crypto-js: CryptoJS
         */
        globals: {
          react: 'React',
        }
      },
      {
        format: 'umd',
        name: 'CustomComponents.test',
        file: './dist/bundle.umd.js',
        sourcemap: isDev ? 'hidden' : 'hidden',
        globals: {
          react: 'React',
        }
      },
      {
        format: 'esm',
        file: './dist/bundle.esm.js',
        sourcemap: isDev ? 'inline' : 'hidden'
      }
    ],
    plugins: [
      terser(),
      clear({
        targets: ['dist']
      }),
      resolve(),
      typescript({
        include: ['**/*.ts', '**/*.tsx'],
      }),
      commonjs(),
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
    // 记得这里也要声明哪些依赖是外部依赖
    external: [
      'react',
    ],
  },
]);
