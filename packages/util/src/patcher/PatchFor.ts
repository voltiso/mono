// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '~/any'
import type { IsOptional } from '~/object'

import type { ArraySetUpdateIt } from './arraySetUpdateIt'
import type { DeleteIt } from './deleteIt'
import type { IncrementIt } from './incrementIt'
import type { KeepIt } from './keepIt'
import type { ReplaceIt } from './replaceIt'

export type PatchFor<X> = IsAny<X> extends true
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
			| PatchFor.Nested<X>
			| (X extends number | bigint ? IncrementIt : never)
			| (X extends readonly (infer E)[] ? ArraySetUpdateIt<E, E> : never)

export namespace PatchFor {
	export type Nested<X> = X extends object
		? keyof X extends never
			? never
			: {
					[key in keyof X]?:
						| PatchFor<X[key]>
						| IsOptional<X, key, DeleteIt, never>
			  }
		: never
}

export type $PatchFor<X> = X extends any ? PatchFor<X> : never
