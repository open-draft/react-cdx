import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.tsx',
  external: ['react'],
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [resolve(), typescript(), commonjs()],
}
