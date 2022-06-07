import { Pick_ } from '../pick'
import { Value } from '../value'

// https://stackoverflow.com/a/51956054/1123898
/**
 * Omit call, construct and index signatures
 */
export type OmitIndexSignatures<T> = T extends object
	? Pick_<T, GetKeys<T>>
	: never

type GetKeys<T> = Value<{
	[k in keyof T as string extends k
		? never
		: number extends k
		? never
		: symbol extends k
		? never
		: k]: k
}>

// type ValueOf<T> = T[keyof T]
