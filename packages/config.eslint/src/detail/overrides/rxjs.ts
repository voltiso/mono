// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import rxjs from 'eslint-plugin-rxjs-updated'

import { codeFilesNoMd } from '~/detail/files.js'

export const rxjsConfig = defineEslintFlatConfig({
	...codeFilesNoMd,

	plugins: { rxjs },

	rules: {
		...getAllRules(rxjs as never, 'rxjs', 'warn'),

		'rxjs/macro': 0, // not yet available?

		'rxjs/ban-observables': 1,
		'rxjs/ban-operators': 1,
		'rxjs/finnish': 1,
		'rxjs/just': 1,
		'rxjs/no-async-subscribe': 1,
		'rxjs/no-compat': 1,
		'rxjs/no-connectable': 1,
		'rxjs/no-create': 1,
		'rxjs/no-cyclic-action': 1,
		'rxjs/no-explicit-generics': 1,
		'rxjs/no-exposed-subjects': 1,
		'rxjs/no-finnish': 0,
		'rxjs/no-ignored-error': 1,
		'rxjs/no-ignored-notifier': 1,
		'rxjs/no-ignored-observable': 1,
		'rxjs/no-ignored-replay-buffer': 1,
		'rxjs/no-ignored-subscribe': 1,
		'rxjs/no-ignored-subscription': 1,
		'rxjs/no-ignored-takewhile-value': 1,
		'rxjs/no-implicit-any-catch': 1,
		'rxjs/no-index': 1,
		'rxjs/no-internal': 1,
		'rxjs/no-nested-subscribe': 1,
		'rxjs/no-redundant-notify': 1,
		'rxjs/no-sharereplay': 1,
		'rxjs/no-subclass': 1,
		'rxjs/no-subject-unsubscribe': 1,
		'rxjs/no-subject-value': 0,
		'rxjs/no-subscribe-handlers': 0,
		'rxjs/no-topromise': 1,
		'rxjs/no-unbound-methods': 1,
		'rxjs/no-unsafe-catch': 1,
		'rxjs/no-unsafe-first': 1,
		'rxjs/no-unsafe-subject-next': 1,
		'rxjs/no-unsafe-switchmap': 1,
		'rxjs/no-unsafe-takeuntil': 1,
		'rxjs/prefer-observer': 1,
		'rxjs/suffix-subjects': 0,
		'rxjs/throw-error': 1,
	},
})
