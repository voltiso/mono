// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultNumberOptions,
	ISchema,
	NumberOptions,
	OPTIONS,
} from '~'
import { SCHEMA_NAME } from '~'

export interface INumber extends ISchema {
	readonly [SCHEMA_NAME]: 'Number'
	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: DefaultNumberOptions

	readonly [OPTIONS]: NumberOptions

	// get isInteger(): boolean
	// get getMin(): number | undefined
	// get getMax(): number | undefined

	// get integer(): INumber
	// min(minValue: number): INumber
	// max(maxValue: number): INumber
	// range(minValue: number, maxValue: number): INumber
}

export function isNumber(x: unknown): x is INumber {
	// eslint-disable-next-line security/detect-object-injection
	return (x as INumber | null)?.[SCHEMA_NAME] === 'Number'
}
