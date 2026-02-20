// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'

import type { $$DocConstructor } from '~'

import type { DocConstructorImpl } from '../DocConstructorImpl'

export function _inferMetadata(docConstructor: $$DocConstructor): void

/** @internal */
export function _inferMetadata(docConstructor: unknown): void {
	$AssumeType<typeof DocConstructorImpl>(docConstructor)

	;(docConstructor._.methods as {}) = {
		...docConstructor._.methods,

		...(docConstructor[Symbol.metadata]?.['methods'] ?? {}),
	}

	delete docConstructor[Symbol.metadata]?.['methods']

	//
	;(docConstructor._.onGets as unknown[]) = [
		...docConstructor._.onGets,

		...((docConstructor[Symbol.metadata]?.['onGets'] as unknown[]) ?? []),
	]

	delete docConstructor[Symbol.metadata]?.['onGets']

	//
	;(docConstructor._.afters as unknown[]) = [
		...docConstructor._.afters,

		...((docConstructor[Symbol.metadata]?.['afters'] as unknown[]) ?? []),
	]

	delete docConstructor[Symbol.metadata]?.['afters']

	//
	;(docConstructor._.beforeCommits as unknown[]) = [
		...docConstructor._.beforeCommits,

		...((docConstructor[Symbol.metadata]?.['beforeCommits'] as unknown[]) ??
			[]),
	]

	delete docConstructor[Symbol.metadata]?.['beforeCommits']
}
