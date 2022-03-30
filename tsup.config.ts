import { defineConfig } from 'tsup'

export default defineConfig({
	entry: [
		'src/index.ts',
		'src/array/index.ts',
		'src/boolean/index.ts',
		'src/object/index.ts',
		'src/string/index.ts',
		//
	],
	format: ['esm', 'cjs'], // , 'iife'],
	dts: true,
	sourcemap: true,
	// minify: true,
})
