// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoThis } from '@voltiso/util'

import type {
	$$Array,
	$$Schemable,
	$$SchemableTuple,
	BivariantUnknownFunction,
	DefaultSchemaOptions,
	SchemaOptions,
	Void,
} from '~'

export interface FunctionOptions extends SchemaOptions {
	Output: (...args: any) => any
	Input: (...args: any) => any

	Outer: (...args: any) => any
	Inner: (...args: any) => any

	// hasThis: boolean
	this: $$Schemable | NoThis

	parameters: $$SchemableTuple | $$Array
	return: $$Schemable
}

export interface DefaultFunctionOptions extends DefaultSchemaOptions {
	Output: BivariantUnknownFunction
	Input: BivariantUnknownFunction

	Outer: BivariantUnknownFunction
	Inner: BivariantUnknownFunction

	// hasThis: false
	this: NoThis

	parameters: []
	return: Void
}
