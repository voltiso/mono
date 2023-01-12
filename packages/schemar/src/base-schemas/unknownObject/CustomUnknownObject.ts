// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Override_,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
} from '@voltiso/util'

import type {
	$$Schemable,
	CustomObject,
	CustomSchema,
	GetDeepShape_,
	GetObjectType,
	InferableObject,
	Object,
	SCHEMA_NAME,
	SimpleSchema,
	Type,
} from '~'

import type {
	DefaultUnknownObjectOptions,
	UnknownObjectOptions,
} from './UnknownObjectOptions'

export type $CustomUnknownObject<O extends Partial<UnknownObjectOptions>> =
	O extends any ? CustomUnknownObject<O> : never

export interface CustomUnknownObject<O extends Partial<UnknownObjectOptions>>
	extends CustomSchema<O> {
	//

	<Shape extends InferableObject>(
		shape: Shape,
	): this[OPTIONS]['isPlain'] extends true
		? CustomObject<{
				shape: Shape
				deepShape: GetDeepShape_<Shape>
				Output: GetObjectType<Shape, { kind: 'out'; isPlain: true }>
				Input: GetObjectType<Shape, { kind: 'in'; isPlain: true }>

				isPlain: true
		  }>
		: // eslint-disable-next-line @typescript-eslint/ban-types
		  Object<Shape>

	readonly [SCHEMA_NAME]: 'UnknownObject'

	readonly [BASE_OPTIONS]: UnknownObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions

	get getIndexSignatures(): []
	get getShape(): {}

	//

	/** Constructor must be `Object` */
	get plain(): CustomUnknownObject.Plain<O>

	index<TKeySchema extends $$Schemable, TValueSchema extends $$Schemable>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): CustomUnknownObject.Index<O, TKeySchema, TValueSchema>

	index<TValueSchema extends $$Schemable>(
		valueSchema: TValueSchema,
	): CustomUnknownObject.Index<O, SimpleSchema<keyof any>, TValueSchema>
}

export namespace CustomUnknownObject {
	export type Plain<O> = CustomUnknownObject<
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
	> = CustomUnknownObject<
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
