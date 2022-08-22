// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'

import type {
	CustomCheck,
	CustomFix,
	DefaultTupleOptions,
	ISchema,
	MergeSchemaOptions,
	SchemableLike,
	TupleOptions,
} from '~'

export interface ITuple extends ISchema {
	readonly [SCHEMA_NAME]: 'Tuple'

	readonly [BASE_OPTIONS]: TupleOptions
	readonly [DEFAULT_OPTIONS]: DefaultTupleOptions

	readonly [OPTIONS]: TupleOptions

	get Type(): readonly unknown[]
	get OutputType(): readonly unknown[]
	get InputType(): readonly unknown[]

	get isReadonlyTuple(): boolean
	get getShape(): SchemableLike[]
	get getLength(): number

	get readonlyTuple(): ITuple
	get mutableTuple(): ITuple
}

export interface IReadonlyTuple extends ITuple {
	readonly [OPTIONS]: MergeSchemaOptions<
		TupleOptions,
		{ isMutableTuple: false }
	>
}

/**
 * For inlining
 *
 * @internal
 */
export type _unused_ITuple = CustomCheck | CustomFix

export interface IMutableTuple extends ITuple {
	readonly [OPTIONS]: MergeSchemaOptions<TupleOptions, { isMutableTuple: true }>

	get Type(): unknown[]
	get OutputType(): unknown[]
	get InputType(): unknown[]
}
