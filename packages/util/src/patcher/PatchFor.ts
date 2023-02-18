// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '~/any'
import type { IsOptional } from '~/object'

import type { ArraySetUpdateIt } from './arraySetUpdateIt'
import type { DeleteIt, DeleteItIfPresent } from './deleteIt'
import type { IncrementIt } from './incrementIt'
import type { KeepIt } from './keepIt'
import type { ReplaceIt } from './replaceIt'

export type PatchFor<
	X,
	atomics = PatchFor.DefaultAtomics,
> = IsAny<X> extends true
	? any
	: unknown extends X
	? unknown // IsIdentical<X, object> extends true ? object :
	: // IsIdentical<X, {}> extends true ? {} :
	[X] extends [never]
	? never
	:
			| X
			| KeepIt
			| ReplaceIt<X>
			| PatchFor.Nested<X, atomics>
			| (X extends number | bigint ? IncrementIt : never)
			| (X extends readonly (infer E)[] ? ArraySetUpdateIt<E, E> : never)

export namespace PatchFor {
	export type Nested<X, atomics> = X extends atomics
		? never
		: X extends object
		? keyof X extends never
			? never
			: {
					[key in keyof X]?:
						| PatchFor<X[key]>
						| IsOptional<X, key, DeleteIt | DeleteItIfPresent, never>
			  }
		: never

	export type DefaultAtomics = Date
	// export type DefaultAtomics = Date | Set<any> | Map<any, any> | Buffer
}

export type $PatchFor<X> = X extends any ? PatchFor<X> : never
