// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultTupleOptions,
	ISchema,
	MergeSchemaOptions,
	OPTIONS,
	SCHEMA_NAME,
	Schemable,
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
	get getElementSchemas(): Schemable[]
	get getLength(): number

	get readonlyTuple(): ITuple
}

export interface IReadonlyTuple extends ITuple {
	readonly [OPTIONS]: MergeSchemaOptions<
		TupleOptions,
		{ isMutableTuple: false }
	>
}

export interface IMutableTuple extends ITuple {
	readonly [OPTIONS]: MergeSchemaOptions<TupleOptions, { isMutableTuple: true }>

	get Type(): unknown[]
	get OutputType(): unknown[]
	get InputType(): unknown[]
}
