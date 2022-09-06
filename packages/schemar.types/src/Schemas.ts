// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Omit } from '@voltiso/util'

import type {
	CustomAny,
	CustomArray,
	CustomBigint,
	CustomBoolean,
	CustomFunction,
	CustomInstance,
	CustomLiteral,
	CustomNever,
	CustomNumber,
	CustomObject,
	CustomRecord,
	CustomSchema,
	CustomString,
	CustomTuple,
	CustomTypeOnly,
	CustomUnion,
	CustomUnknown,
	CustomUnknownFunction,
	CustomUnknownLiteral,
	CustomUnknownObject,
	CustomUnknownRecord,
	CustomUnknownSchema,
	CustomUnknownSymbol,
	CustomVoid,
	SchemaOptions,
} from '~'

export interface Schemas<
	O extends Partial<SchemaOptions> & { Output?: any; Input?: any } = {},
> {
	TypeOnly: CustomTypeOnly<O>

	Never: CustomNever<$Omit<O, 'Output' | 'Input'>>
	Void: CustomVoid<O>
	Any: CustomAny<O>
	Unknown: CustomUnknown<O>
	UnknownSchema: CustomUnknownSchema<O>

	String: CustomString<O>
	Number: CustomNumber<O>
	Bigint: CustomBigint<O>
	Boolean: CustomBoolean<O>
	UnknownSymbol: CustomUnknownSymbol<O>

	Literal: CustomLiteral<O>
	UnknownLiteral: CustomUnknownLiteral<O>

	Instance: CustomInstance<O>

	Function: CustomFunction<O>
	UnknownFunction: CustomUnknownFunction<O>

	Object: CustomObject<O>
	UnknownObject: CustomUnknownObject<O>

	Record: CustomRecord<O>
	UnknownRecord: CustomUnknownRecord<O>

	Array: CustomArray<O>
	Tuple: CustomTuple<O>

	Union: CustomUnion<O>
}

// export type SchemaName = keyof Schemas

//

// export type GetSchemaByName<schemaName, O> = schemaName extends keyof Schemas<O>
// 	? Schemas<O>[schemaName]
// 	: never

//

// type IsUnion<T, U extends T = T> = (
// 	T extends any ? (U extends T ? false : true) : never
// ) extends false
// 	? false
// 	: true

// export type GetSchemaByName<schemaName, O> = IsUnion<schemaName> extends true
// 	? ISchema
// 	: schemaName extends keyof Schemas<O>
// 	? Schemas<O>[schemaName]
// 	: never

//

export type GetSchemaByName<
	schemaName,
	O extends Partial<SchemaOptions>,
> = string extends schemaName
	? CustomSchema<O>
	: [schemaName] extends [keyof Schemas<O>]
	? schemaName extends keyof Schemas<O>
		? Schemas<O>[schemaName]
		: never
	: never
