// https://stackoverflow.com/a/51956054/1123898

import { IsEqual } from '../../IsEqual'

/**
 * Omit call, construct and index signatures
 */
export type OmitSignatures<T> = {
	[K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

/**
 * Has call, construct or index signature
 */
export type HasSignatures<X extends object, T = true, F = false> = IsEqual<X, OmitSignatures<X>, F, T>
