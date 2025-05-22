// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_, OPTIONS } from '@voltiso/util'

import type { $$Tuple, CustomSchema, CustomSchema$, TupleOptions } from '~'

//

export interface CustomTuple<O extends Partial<TupleOptions>>
	extends $$Tuple,
		CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Tuple'

	readonly [Voltiso.BASE_OPTIONS]: TupleOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: TupleOptions.Default

	//

	get isReadonlyTuple(): this[Voltiso.OPTIONS]['isReadonlyTuple']

	get getShape(): this[Voltiso.OPTIONS]['shape']
	get hasRest(): this[Voltiso.OPTIONS]['hasRest']
	get getRestSchema(): this[Voltiso.OPTIONS]['rest']

	get getLength(): number // _GetArrayLength_<this[Voltiso.OPTIONS]['shape']>
}

//

export interface CustomTuple$<O extends Partial<TupleOptions>>
	extends $$Tuple,
		CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Tuple'

	readonly [Voltiso.BASE_OPTIONS]: TupleOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: TupleOptions.Default

	//

	get isReadonlyTuple(): this[Voltiso.OPTIONS]['isReadonlyTuple']

	get getShape(): this[Voltiso.OPTIONS]['shape']
	get hasRest(): this[Voltiso.OPTIONS]['hasRest']
	get getRestSchema(): this[Voltiso.OPTIONS]['rest']

	get getLength(): number // _GetArrayLength_<this[Voltiso.OPTIONS]['shape']>

	//

	get Final(): CustomTuple<O>

	//

	get readonlyTuple(): CustomTuple.Readonly<this, O>
	get mutableTuple(): CustomTuple.Mutable<this, O>
}

//

export declare namespace CustomTuple {
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
