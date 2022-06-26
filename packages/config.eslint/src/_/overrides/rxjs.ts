// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { codeFiles } from '../files.js'

export const rxjs = {
	extends: ['plugin:rxjs/recommended'],

	files: codeFiles,

	plugins: ['rxjs'],

	rules: {
		'rxjs/ban-observables': 2,
		'rxjs/ban-operators': 2,
		'rxjs/finnish': 2,
		'rxjs/just': 2,
		'rxjs/no-async-subscribe': 2,
		'rxjs/no-compat': 2,
		'rxjs/no-connectable': 2,
		'rxjs/no-create': 2,
		'rxjs/no-cyclic-action': 2,
		'rxjs/no-explicit-generics': 2,
		'rxjs/no-exposed-subjects': 2,
		'rxjs/no-finnish': 2,
		'rxjs/no-ignored-error': 2,
		'rxjs/no-ignored-notifier': 2,
		'rxjs/no-ignored-observable': 2,
		'rxjs/no-ignored-replay-buffer': 2,
		'rxjs/no-ignored-subscribe': 2,
		'rxjs/no-ignored-subscription': 2,
		'rxjs/no-ignored-takewhile-value': 2,
		'rxjs/no-implicit-any-catch': 2,
		'rxjs/no-index': 2,
		'rxjs/no-internal': 2,
		'rxjs/no-nested-subscribe': 2,
		'rxjs/no-redundant-notify': 2,
		'rxjs/no-sharereplay': 2,
		'rxjs/no-subclass': 2,
		'rxjs/no-subject-unsubscribe': 2,
		'rxjs/no-subject-value': 2,
		'rxjs/no-subscribe-handlers': 2,
		'rxjs/no-topromise': 2,
		'rxjs/no-unbound-methods': 2,
		'rxjs/no-unsafe-catch': 2,
		'rxjs/no-unsafe-first': 2,
		'rxjs/no-unsafe-subject-next': 2,
		'rxjs/no-unsafe-switchmap': 2,
		'rxjs/no-unsafe-takeuntil': 2,
		'rxjs/prefer-observer': 2,
		'rxjs/suffix-subjects': 2,
		'rxjs/throw-error': 2,
	},
}
