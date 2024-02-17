// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import esPlugin from 'eslint-plugin-es-x'

// console.log('!!!', Object.keys(esPlugin.configs))

const baseConfig = eslintFlatConfigFromConfig(esPlugin.configs['restrict-to-es3'], {'es-x': esPlugin}, {}, esPlugin.configs)

// console.log('!!!', baseConfig)

export const es = defineEslintFlatConfig(
	...baseConfig, {
	// files: ['*'],

	// plugins: ['es-x'],
	// plugins: {
	// 	'es-x': esPlugin,
	// },

	// extends: ['plugin:es-x/restrict-to-es3'], // oldest possible (override-disable rules manually?)
	// extends: ['plugin:es/restrict-to-es5'], // 2nd oldest
	// extends: ['plugin:es/restrict-to-es2015'], // 3rd oldest
	// extends: ['plugin:es/restrict-to-es2016'], // 4th oldest

	rules: {
		'es-x/no-hashbang': 0,
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
		'es-x/no-new-target': 0,
		'es-x/no-dynamic-import': 0,
		'es-x/no-generators': 0,
		'es-x/no-numeric-separators': 0, // ✅ `@voltiso/transform/compat`

		'es-x/no-regexp-u-flag': 0,
		'es-x/no-regexp-named-capture-groups': 0,

		'es-x/no-symbol': 0,
		'es-x/no-bigint': 0,

		'es-x/no-set': 0,
		'es-x/no-map': 0,

		'es-x/no-json': 0,
		'es-x/no-reflect': 0,

		'es-x/no-proxy': 0,
		'es-x/no-promise': 0,

		// number
		'es-x/no-number-isnan': 0,
		'es-x/no-number-isinteger': 0,

		// object
		'es-x/no-object-create': 0,
		'es-x/no-object-keys': 0,
		'es-x/no-object-values': 0,
		'es-x/no-object-entries': 0,
		'es-x/no-object-fromentries': 0,
		'es-x/no-object-setprototypeof': 0,
		'es-x/no-object-getprototypeof': 0,
		'es-x/no-object-freeze': 0,
		'es-x/no-object-seal': 0,
		'es-x/no-object-defineproperty': 0,
		'es-x/no-object-getownpropertynames': 0,
		'es-x/no-object-getownpropertysymbols': 0,
		'es-x/no-object-getownpropertydescriptor': 0,
		'es-x/no-object-getownpropertydescriptors': 0,
		'es-x/no-object-defineproperties': 0,

		// array
		'es-x/no-array-prototype-some': 0,
		'es-x/no-array-prototype-filter': 0,
		'es-x/no-array-prototype-map': 0,
		'es-x/no-array-prototype-includes': 0,
		'es-x/no-array-prototype-entries': 0,
		'es-x/no-array-prototype-keys': 0,
		'es-x/no-array-prototype-fill': 0,
		'es-x/no-array-isarray': 0,
		'es-x/no-array-from': 0,
		'es-x/no-array-prototype-reduce': 0,

		// string
		'es-x/no-string-prototype-trim': 0, // es 5
		'es-x/no-string-prototype-startswith': 0,
		'es-x/no-string-prototype-endswith': 0,
		'es-x/no-string-prototype-includes': 0,
		'es-x/no-string-prototype-matchall': 0,

		// function
		'es-x/no-function-prototype-bind': 0,

		// !!! NOT SURE YET - new stuff ♥️
		'es-x/no-nullish-coalescing-operators': 0,
		'es-x/no-logical-assignment-operators': 0,
	},

	// settings: {
	// 	'es-x': { aggressive: true },
	// },
} as const)
