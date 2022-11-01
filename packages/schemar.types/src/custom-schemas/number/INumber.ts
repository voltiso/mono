// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import type { SCHEMA_NAME } from '_'

import type { $$Schema, ISchema, SchemaLike } from '~/Schema'

import type { DefaultNumberOptions, NumberOptions } from './NumberOptions'

export interface $$Number extends $$Schema {
	readonly [SCHEMA_NAME]: 'Number'
}

export interface NumberLike<T extends number> extends $$Number, SchemaLike<T> {
	readonly [SCHEMA_NAME]: 'Number'
}

export interface INumber extends ISchema<number> {
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
