import { ISchema } from '../../schema'
import { UnknownOptions } from './_/UnknownOptions'

export const IS_UNKNOWN = Symbol('IS_UNKNOWN')
export type IS_UNKNOWN = typeof IS_UNKNOWN

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUnknown<O extends UnknownOptions = UnknownOptions>
	extends ISchema<O> {
	readonly [IS_UNKNOWN]: true
}

export function isUnknown(x: unknown): x is IUnknown {
	return !!(x as IUnknown | null)?.[IS_UNKNOWN]
}
