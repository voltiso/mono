// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { NumberOptions } from './_/NumberOptions.js'

export const IS_NUMBER = Symbol('IS_NUMBER')
export type IS_NUMBER = typeof IS_NUMBER

export interface INumber<O extends NumberOptions = NumberOptions>
	extends ISchema<O> {
	readonly [IS_NUMBER]: true

	get isInteger(): O['isInteger']
	get getMin(): O['min']
	get getMax(): O['max']

	get integer(): INumber
	min(minValue: number): INumber
	max(maxValue: number): INumber
	range(minValue: number, maxValue: number): INumber
}

export function isNumber(x: unknown): x is INumber {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as INumber | null)?.[IS_NUMBER])
}
