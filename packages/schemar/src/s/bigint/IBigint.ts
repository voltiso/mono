// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { BigintOptions } from './_/BigintOptions.js'

export const IS_BIGINT = Symbol('IS_BIGINT')
export type IS_BIGINT = typeof IS_BIGINT

export interface IBigint<O extends BigintOptions = BigintOptions>
	extends ISchema<O> {
	readonly [IS_BIGINT]: true

	get getMin(): bigint | undefined
	get getMax(): bigint | undefined
}

export function isBigint(x: unknown): x is IBigint {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IBigint | null)?.[IS_BIGINT])
}
