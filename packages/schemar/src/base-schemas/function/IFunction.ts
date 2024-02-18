// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept, BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { $$Schema, FunctionOptions, Schema, SCHEMA_NAME, Schema$ } from '~'

export interface IFunction extends Schema {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: FunctionOptions.Default

	//

	get Inner(): (...args: any) => unknown
	get Outer(): (...args: any) => unknown

	readonly OutputThis: unknown
	readonly InputThis: unknown
	readonly This: unknown

	readonly OutputParameters: unknown[] // | AlsoAccept<unknown> // CustomFunction assignability - new TS bug?
	readonly InputParameters: unknown[] | AlsoAccept<unknown> // CustomFunction assignability - new TS bug?
	readonly Parameters: unknown[] | AlsoAccept<unknown> // CustomFunction assignability - new TS bug?

	readonly OutputReturn: unknown
	readonly InputReturn: unknown
	readonly Return: unknown

	//

	get getThisSchema(): $$Schema
	get hasThis(): boolean

	get getParametersSchema(): $$Schema
	get getReturnSchema(): $$Schema
}

export interface IFunction$ extends Schema$ {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: FunctionOptions.Default

	//

	get Inner(): (...args: any) => unknown
	get Outer(): (...args: any) => unknown

	readonly OutputThis: unknown
	readonly InputThis: unknown
	readonly This: unknown

	readonly OutputParameters: unknown[]
	readonly InputParameters: unknown[]
	readonly Parameters: unknown[]

	readonly OutputReturn: unknown
	readonly InputReturn: unknown
	readonly Return: unknown

	//

	get getThisSchema(): $$Schema
	get hasThis(): boolean

	get getParametersSchema(): $$Schema
	get getReturnSchema(): $$Schema
}
