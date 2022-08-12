// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { LeafData } from '~/Data'
import type { DeleteIt, IncrementIt, ReplaceIt } from '~/it'

export type UpdatesFromData<T, OutputType> =
	| UpdatesFromData.Update<T, OutputType>
	| UpdatesFromData.Replace<T>
	| (undefined extends OutputType ? DeleteIt : never)
	| (T extends number ? IncrementIt : never)

export declare namespace UpdatesFromData {
	export type Update<T, OutputType> = unknown extends T
		? unknown
		: object extends Required<T>
		? never
		: T extends LeafData
		? T
		: {
				[k in keyof T]?: UpdatesFromData<
					T[k],
					k extends keyof OutputType ? OutputType[k] : never
				>
		  }

	export type Replace<T> = ReplaceIt<T>
}
