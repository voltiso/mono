// https://stackoverflow.com/a/51956054/1123898
/**
 * Omit call, construct and index signatures
 */
export type OmitSignatures<T> = {
	[K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}