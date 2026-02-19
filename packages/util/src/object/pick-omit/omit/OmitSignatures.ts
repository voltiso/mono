// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Pick_, Value } from '~/object'

// https://stackoverflow.com/a/51956054/1123898
/** Omit call, construct and index signatures */
export type OmitSignatures<T> = T extends object ? Pick_<T, GetKeys<T>> : never

// export type OmitSignatures<T> = T extends object
// 	? HasIndexSignature<T> extends true
// 		? Pick_<T, GetKeys<T>>
// 		: T
// 	: never

type GetKeys<T> = Value<{
	[k in keyof T as string extends k
		? never
		: number extends k
			? never
			: symbol extends k
				? never
				: k]: k
}>
