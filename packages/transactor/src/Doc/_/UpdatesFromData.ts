// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, DeleteIt, IncrementIt, ReplaceIt } from '@voltiso/util'

import type { LeafData } from '~/Data'

/** @inline */
export type UpdatesFromData<T, OutputType> =
	| UpdatesFromData.Update<T, OutputType>
	| UpdatesFromData.Replace<T>
	| (undefined extends OutputType ? DeleteIt : never)
	| (T extends number ? IncrementIt : never)

export declare namespace UpdatesFromData {
	export type Update<T, OutputType> = T extends LeafData
		? T
		: _<
				{ readonly id?: never } & UpdateNested<
					T, // Omit<T, 'id'>,
					OutputType // Omit<OutputType, 'id'>
				>
		  >

	export type Nested<T, OutputType> =
		| UpdatesFromData.UpdateNested<T, OutputType>
		| UpdatesFromData.Replace<T>
		| (undefined extends OutputType ? DeleteIt : never)
		| (T extends number ? IncrementIt : never)

	/** @inline */
	export type UpdateNested<T, OutputType> = unknown extends T
		? unknown
		: object extends Required<T>
		? never
		: T extends LeafData
		? T
		: T extends object
		? {
				[k in keyof T]?: Nested<
					T[k],
					k extends keyof OutputType ? OutputType[k] : never
				>
		  }
		: T

	/** @inline */
	export type Replace<T> = ReplaceIt<T>
}
