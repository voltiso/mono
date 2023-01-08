// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '~/any'
import type { IsOptional } from '~/object'

import type { ArraySetUpdateIt } from './arraySetUpdateIt'
import type { DeleteIt } from './deleteIt'
import type { IncrementIt } from './incrementIt'
import type { KeepIt } from './keepIt'
import type { ReplaceIt } from './replaceIt'

export type PatchFor<X> =
	| IsAny<X, any, never>
	| (unknown extends X ? unknown : never)
	| KeepIt
	| (X extends object
			? keyof X extends never
				? never
				: {
						[key in keyof X]?:
							| PatchFor<X[key]>
							| IsOptional<X, key, DeleteIt, never>
				  }
			: never)
	| ReplaceIt<X>
	| (X extends readonly (infer E)[] ? ArraySetUpdateIt<E, E> : never)
	// | (X extends undefined ? DeleteIt : never)
	| (X extends number ? IncrementIt : never)
	| (object extends X ? never : X)

export type $PatchFor<X> = X extends any ? PatchFor<X> : never
