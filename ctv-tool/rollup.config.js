import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';


const isDev = process.env.NODE_ENV !== 'production';
const sourcemap = isDev ? 'inline' : 'hidden'

export default defineConfig([{
  input: './src/index.tsx',
  context: 'window',
  output:
    [
      {
        // 目前宿主只支持 umd 和 iife 规范
        format: 'umd',
        // 挂载的全局变量名，支持 namespace（通过 namespace.xxx)
        // 推荐使用 CustomComponents 作为 namespace
        name: 'CustomComponents./* @eval PascalCase(name) */',
        file: './dist/bundle.umd.js',
        sourcemap,
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
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        }
      }
    ],
    plugins: [
      isDev ? null : terser(),
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
      'react-dom',
      'styled-components',
    ],
  },
]);
