// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { LeafData } from '~/Data'
import type { DeleteIt, IncrementIt, ReplaceIt } from '~/it'

export type UpdatesFromData<T> =
	| UpdatesFromData.Update<T>
	| ReplaceIt<T>
	| (undefined extends T ? DeleteIt : never)
	| (T extends number ? IncrementIt : never)

export declare namespace UpdatesFromData {
	export type Update<T> = unknown extends T
		? unknown
		: object extends Required<T>
		? never
		: T extends LeafData
		? T
		: { [k in keyof T]?: UpdatesFromData<T[k]> }
}
