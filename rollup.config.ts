import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.tsx',
  external: ['react'],
  output: {
    file: 'lib/index.js',
    format: 'esm',
  },
  plugins: [resolve(), typescript()],
}
