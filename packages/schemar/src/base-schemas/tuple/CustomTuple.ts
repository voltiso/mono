// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Override_,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
} from '@voltiso/util'

import type {
	_GetArrayLength_,
	$$Tuple,
	CustomSchema,
	SCHEMA_NAME,
	TupleOptions,
} from '~'

export interface CustomTuple<O extends Partial<TupleOptions>>
	extends $$Tuple,
		CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Tuple'

	readonly [BASE_OPTIONS]: TupleOptions
	readonly [DEFAULT_OPTIONS]: TupleOptions.Default

	//

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple']

	get getShape(): this[OPTIONS]['shape']
	get hasRest(): this[OPTIONS]['hasRest']
	get getRestSchema(): this[OPTIONS]['rest']

	// eslint-disable-next-line etc/no-internal
	get getLength(): _GetArrayLength_<this[OPTIONS]['shape']>

	//

	get readonlyTuple(): CustomTuple.Readonly<this, O>
	get mutableTuple(): CustomTuple.Mutable<this, O>
}

export namespace CustomTuple {
	export type Readonly<This extends $$Tuple, O> = This extends {
		[OPTIONS]: { Output: readonly unknown[]; Input: readonly unknown[] }
	}
		? CustomTuple<
				$Override_<
					O,
					{
						readonlyTuple: true
						Output: readonly [...This[OPTIONS]['Output']]
						Input: readonly [...This[OPTIONS]['Input']]
					}
				>
		  >
		: never

	export type Mutable<This extends $$Tuple, O> = This extends {
		[OPTIONS]: { Output: readonly unknown[]; Input: readonly unknown[] }
	}
		? CustomTuple<
				$Override_<
					O,
					{
						readonlyTuple: false
						Output: [...This[OPTIONS]['Output']]
						Input: [...This[OPTIONS]['Input']]
					}
				>
		  >
		: never
}
