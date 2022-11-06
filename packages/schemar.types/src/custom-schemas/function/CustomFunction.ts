// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type {
	$$Schema,
	CustomSchema,
	DefaultFunctionOptions,
	FunctionOptions,
} from '~'

export interface $$Function extends $$Schema {
	readonly [SCHEMA_NAME]: 'Function'
}

export interface CustomFunction<O extends Partial<FunctionOptions>>
	extends $$Function,
		CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	//

	get getArgumentsSchema(): this[OPTIONS]['arguments']
	get getResultSchema(): this[OPTIONS]['result']
}
