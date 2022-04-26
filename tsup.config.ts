import { defineConfig } from 'tsup'

export default defineConfig({
	entry: [
		'src/index.ts',
		'src/array/index.ts',
		'src/boolean/index.ts',
		'src/number/index.ts',
		'src/object/index.ts',
		'src/string/index.ts',
		'src/function/index.ts',
		'src/promise/index.ts',
		'src/class/index.ts',
		'src/symbol/index.ts',
		'src/parser/index.ts',
		'src/bdd/index.ts',
		'src/compiler-options/index.ts',
		//
	],
	format: ['esm', 'cjs'], // , 'iife'],
	dts: true,
	sourcemap: true,
	// minify: true,
})
