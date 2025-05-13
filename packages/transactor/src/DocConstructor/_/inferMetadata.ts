// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'

import type { $$DocConstructor } from '~'

import type { DocConstructorImpl } from '../DocConstructorImpl'

export function _inferMetadata(docConstructor: $$DocConstructor): void

/** @internal */
export function _inferMetadata(docConstructor: unknown): void {
	$AssumeType<typeof DocConstructorImpl>(docConstructor)

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	;(docConstructor._.methods as {}) = {
		...docConstructor._.methods,
		// eslint-disable-next-line no-use-extend-native/no-use-extend-native, unicorn/no-useless-fallback-in-spread
		...(docConstructor[Symbol.metadata]?.['methods'] ?? {}),
	}

	// eslint-disable-next-line no-use-extend-native/no-use-extend-native
	delete docConstructor[Symbol.metadata]?.['methods']

	//
	;(docConstructor._.onGets as unknown[]) = [
		...docConstructor._.onGets,
		// eslint-disable-next-line no-use-extend-native/no-use-extend-native, @typescript-eslint/no-unnecessary-condition
		...((docConstructor[Symbol.metadata]?.['onGets'] as unknown[]) ?? []),
	]

	// eslint-disable-next-line no-use-extend-native/no-use-extend-native
	delete docConstructor[Symbol.metadata]?.['onGets']

	//
	;(docConstructor._.afters as unknown[]) = [
		...docConstructor._.afters,
		// eslint-disable-next-line no-use-extend-native/no-use-extend-native, @typescript-eslint/no-unnecessary-condition
		...((docConstructor[Symbol.metadata]?.['afters'] as unknown[]) ?? []),
	]

	// eslint-disable-next-line no-use-extend-native/no-use-extend-native
	delete docConstructor[Symbol.metadata]?.['afters']

	//
	;(docConstructor._.beforeCommits as unknown[]) = [
		...docConstructor._.beforeCommits,
		// eslint-disable-next-line no-use-extend-native/no-use-extend-native, @typescript-eslint/no-unnecessary-condition
		...((docConstructor[Symbol.metadata]?.['beforeCommits'] as unknown[]) ??
			[]),
	]

	// eslint-disable-next-line no-use-extend-native/no-use-extend-native
	delete docConstructor[Symbol.metadata]?.['beforeCommits']
}
