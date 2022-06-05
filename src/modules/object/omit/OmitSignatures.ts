// https://stackoverflow.com/a/51956054/1123898
/**
 * Omit call, construct and index signatures
 */
export type OmitSignatures<T> = {
	[k in keyof T as string extends k
		? never
		: number extends k
		? never
		: symbol extends k
		? never
		: k]: T[k]
}
