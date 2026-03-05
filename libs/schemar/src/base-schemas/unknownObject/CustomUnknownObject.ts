// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type {
	$$InferableObject,
	$$Object,
	$$Schemable,
	$$UnknownObject,
	CustomSchema,
	CustomSchema$,
	GetObject$,
	Schema,
	Type,
} from '~'

import type { UnknownObjectOptions } from './UnknownObjectOptions'

//

export interface CustomUnknownObject<O extends Partial<UnknownObjectOptions>>
	extends CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownObject'

	readonly [Voltiso.BASE_OPTIONS]: UnknownObjectOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownObjectOptions.Default

	get getIndexSignatures(): []
	get getShape(): {}
}

//

export interface CustomUnknownObject$<O extends Partial<UnknownObjectOptions>>
	extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownObject'

	readonly [Voltiso.BASE_OPTIONS]: UnknownObjectOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownObjectOptions.Default

	get getIndexSignatures(): []
	get getShape(): {}

	//

	get Final(): CustomUnknownObject<O>

	//

	<Shape extends $$InferableObject>(shape: Shape): GetObject$<Shape>
	<AlreadySchema extends $$Object | $$UnknownObject>(
		schema: AlreadySchema,
	): AlreadySchema

	<X extends $$InferableObject | $$Object | $$UnknownObject>(
		x: X,
	): X extends $$Object | $$UnknownObject
		? X
		: X extends $$InferableObject
			? GetObject$<X>
			: never

	// this[Voltiso.OPTIONS]['isPlain'] extends true
	// 	? CustomObject<{
	// 			shape: Shape
	// 			deepShape: GetDeepShape_<Shape>
	// 			Output: GetObjectType<Shape, { kind: 'out'; isPlain: true }>
	// 			Input: GetObjectType<Shape, { kind: 'in'; isPlain: true }>

	// 			isPlain: true
	// 	  }>
	// 	: Object$<Shape>

	//

	/** Constructor must be `Object` */
	get plain(): CustomUnknownObject.Plain<O>

	index<TKeySchema extends $$Schemable, TValueSchema extends $$Schemable>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): CustomUnknownObject.Index<O, TKeySchema, TValueSchema>

	index<TValueSchema extends $$Schemable>(
		valueSchema: TValueSchema,
	): CustomUnknownObject.Index<O, Schema<keyof any>, TValueSchema>
}

//

export declare namespace CustomUnknownObject {
	export type Plain<O> = CustomUnknownObject$<
		$Override_<
			O,
			{
				isPlain: true
				Output: object
				Input: object
			}
		>
	>

	export type Index<
		O,
		TKeySchema extends $$Schemable,
		TValueSchema extends $$Schemable,
	> = CustomUnknownObject$<
		$Override_<
			O,
			{
				Output: {
					[k in Type<TKeySchema> & keyof any]: Type<TValueSchema>
				}

				Input: {
					[k in Type<TKeySchema> & keyof any]: Type<TValueSchema>
				}
			}
		>
	>
}
