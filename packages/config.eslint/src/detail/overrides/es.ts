// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const es = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['es-x'],

	extends: ['plugin:es-x/restrict-to-es3'], // oldest possible (override-disable rules manually?)
	// extends: ['plugin:es/restrict-to-es5'], // 2nd oldest
	// extends: ['plugin:es/restrict-to-es2015'], // 3rd oldest
	// extends: ['plugin:es/restrict-to-es2016'], // 4th oldest

	rules: {
		'es-x/no-modules': 0,
		'es-x/no-optional-chaining': 0,
		'es-x/no-rest-spread-properties': 0,
		'es-x/no-classes': 0,
		'es-x/no-trailing-commas': 0,
		'es-x/no-block-scoped-variables': 0,
		'es-x/no-subclassing-builtins': 0,
		'es-x/no-keyword-properties': 0,
		'es-x/no-destructuring': 0,
		'es-x/no-template-literals': 0,
		'es-x/no-trailing-function-commas': 0,
		'es-x/no-regexp-u-flag': 0,
		'es-x/no-arrow-functions': 0,
		'es-x/no-class-fields': 0,
		'es-x/no-accessor-properties': 0,
		'es-x/no-spread-elements': 0,
		'es-x/no-for-of-loops': 0,
		'es-x/no-rest-parameters': 0,
		'es-x/no-property-shorthands': 0,
		'es-x/no-async-functions': 0,
		'es-x/no-computed-properties': 0,
		'es-x/no-optional-catch-binding': 0,
		'es-x/no-block-scoped-functions': 0,
		'es-x/no-default-parameters': 0,
		'es-x/no-numeric-separators': 0, // ✅ `@voltiso/transform/compat`

		'es-x/no-symbol': 0,
		'es-x/no-bigint': 0,

		'es-x/no-set': 0,
		'es-x/no-map': 0,

		'es-x/no-json': 0,
		'es-x/no-reflect': 0,

		'es-x/no-proxy': 0,
		'es-x/no-promise': 0,

		// number prototype functions
		'es-x/no-number-isnan': 0,
		'es-x/no-number-isinteger': 0,

		// object prototype functions
		'es-x/no-object-keys': 0,
		'es-x/no-object-values': 0,
		'es-x/no-object-entries': 0,
		'es-x/no-object-fromentries': 0,
		'es-x/no-object-setprototypeof': 0,
		'es-x/no-object-getprototypeof': 0,
		'es-x/no-object-freeze': 0,
		'es-x/no-object-seal': 0,

		// array prototype functions
		'es-x/no-array-isarray': 0,
		'es-x/no-array-prototype-map': 0,
		'es-x/no-array-prototype-includes': 0,
		'es-x/no-array-prototype-entries': 0,

		// string prototype functions
		'es-x/no-string-prototype-startswith': 0,
		'es-x/no-string-prototype-includes': 0,

		// function prototype functions
		'es-x/no-function-prototype-bind': 0,

		// !!! NOT SURE YET
		'es-x/no-nullish-coalescing-operators': 0,
	},

	// settings: {
	// 	'es-x': { aggressive: true },
	// },
} as const)
