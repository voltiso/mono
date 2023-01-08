// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type {
	$$Schema,
	DefaultFunctionOptions,
	FunctionOptions,
	ISchema,
	SCHEMA_NAME,
} from '~'

export interface IFunction<
	T extends (...args: any) => any = (...args: any) => any,
> extends ISchema<T> {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

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
