// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'

import type { DefaultNumberOptions, ISchema, NumberOptions } from '~'

export interface INumber extends ISchema {
	readonly [SCHEMA_NAME]: 'Number'
	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: DefaultNumberOptions

	readonly [OPTIONS]: NumberOptions

	get isInteger(): boolean
	get getMin(): number | undefined
	get getMax(): number | undefined

	//! these cause too deep instantiation when checking if CustomNumber is assignable to INumber
	// get integer(): INumber
	// min(minValue: number): INumber
	// max(maxValue: number): INumber
	// range(minValue: number, maxValue: number): INumber
}
