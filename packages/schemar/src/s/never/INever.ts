import { ISchema } from '../../schema'
import { NeverOptions } from './_/NeverOptions'

export const IS_NEVER = Symbol('IS_NEVER')
export type IS_NEVER = typeof IS_NEVER

export interface INever<O extends NeverOptions = NeverOptions>
	extends ISchema<O> {
	readonly [IS_NEVER]: true
}

export function isNever(x: unknown): x is INever {
	return !!(x as INever | null)?.[IS_NEVER]
}
