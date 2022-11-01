// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import type { SCHEMA_NAME } from '_'

import type { DefaultFunctionOptions, FunctionOptions, ISchema } from '~'

export interface IFunction<
	T extends (...args: any) => any = (...args: any) => any,
> extends ISchema<T> {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	//

	get getArgumentsSchema(): any
	get getResultSchema(): any
}
