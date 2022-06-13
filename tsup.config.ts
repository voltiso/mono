import { defineConfig } from 'tsup'

export default defineConfig({
	entry: [
		'src/index.ts',
		'src/modules/array/index.ts',
		'src/modules/bdd/index.ts',
		'src/modules/boolean/index.ts',
		'src/modules/class/index.ts',
		'src/modules/clone/index.ts',
		'src/modules/compiler-options/index.ts',
		'src/modules/error/index.ts',
		'src/modules/function/index.ts',
		'src/modules/null/index.ts',
		'src/modules/number/index.ts',
		'src/modules/object/index.ts',
		'src/modules/parser/index.ts',
		'src/modules/promise/index.ts',
		'src/modules/set/index.ts',
		'src/modules/string/index.ts',
		'src/modules/symbol/index.ts',
		//
	],
	// format: ['esm'],
	// format: ['cjs'],
	format: ['esm', 'cjs'],
	// format: ['esm', 'cjs', 'iife'],

	dts: true,
	sourcemap: true,

	// minify: true,

	// esbuildOptions: (options, context) => {
	// 	options.jsx = 'preserve'
	// 	return options
	// },

	tsconfig: 'tsconfig.build.json',

	// inject: ['./script/inject-react.ts'],

	banner: { js: "'use strict'" },

	treeshake: 'smallest',
})
