/**
 * Omit call and construct signatures
 */
export type OmitCall<T> = {
	[K in keyof T]: T[K]
}
