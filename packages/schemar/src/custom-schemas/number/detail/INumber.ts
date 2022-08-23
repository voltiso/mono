// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type {
	DefaultNumberOptions,
	ISchema,
	NumberOptions,
	SchemaLike,
} from '~'

export interface NumberLike extends SchemaLike<number> {
	readonly [SCHEMA_NAME]: 'Number'
}

export interface INumber extends ISchema {
	readonly [SCHEMA_NAME]: 'Number'

	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: DefaultNumberOptions

	get isInteger(): boolean
	get getMin(): number | undefined
	get getMax(): number | undefined

	get integer(): any
	min(minValue: number): any
	max(maxValue: number): any
	range(minValue: number, maxValue: number): any
}
