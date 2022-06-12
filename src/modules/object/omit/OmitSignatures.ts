import { Value } from '../key-value'
import { Pick_ } from '../pick-omit'

/**
 * Omit call, construct and index signatures
 *  - @see https://stackoverflow.com/a/51956054/1123898
 */
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
