// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { $$Schema, Schema, SCHEMA_NAME, Schema$, SchemaLike } from '~'

import type { NumberOptions } from './NumberOptions'

export interface $$Number extends $$Schema {
	readonly [SCHEMA_NAME]: 'Number'
}

export interface NumberLike<T extends number> extends $$Number, SchemaLike<T> {
	readonly [SCHEMA_NAME]: 'Number'
}

export interface INumber extends Schema {
	readonly [SCHEMA_NAME]: 'Number'

	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: NumberOptions.Default

	get isInteger(): boolean
	get getMin(): number | undefined
	get getMax(): number | undefined
}

//

export interface INumber$ extends Schema$ {
	readonly [SCHEMA_NAME]: 'Number'

	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: NumberOptions.Default

	get isInteger(): boolean
	get getMin(): number | undefined
	get getMax(): number | undefined

	//

	get integer(): any
	min(minValue: number): any
	max(maxValue: number): any
	range(minValue: number, maxValue: number): any
}
