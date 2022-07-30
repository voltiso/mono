// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

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
	CustomString,
	CustomSymbol,
	CustomTuple,
	CustomTypeOnly,
	CustomUnion,
	CustomUnknown,
	CustomUnknownFunction,
	CustomUnknownLiteral,
	CustomUnknownObject,
	CustomUnknownSchema,
	CustomVoid,
} from '~'

export interface Schemas<O = {}> {
	TypeOnly: CustomTypeOnly<O>

	Never: CustomNever<O>
	Void: CustomVoid<O>
	Any: CustomAny<O>
	Unknown: CustomUnknown<O>
	UnknownSchema: CustomUnknownSchema<O>

	String: CustomString<O>
	Number: CustomNumber<O>
	Bigint: CustomBigint<O>
	Boolean: CustomBoolean<O>
	Symbol: CustomSymbol<O>

	Literal: CustomLiteral<O>
	UnknownLiteral: CustomUnknownLiteral<O>

	Instance: CustomInstance<O>

	Function: CustomFunction<O>
	UnknownFunction: CustomUnknownFunction<O>

	Object: CustomObject<O>
	UnknownObject: CustomUnknownObject<O>

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

export type GetSchemaByName<schemaName, O> = string extends schemaName
	? never
	: [schemaName] extends [keyof Schemas<O>]
	? schemaName extends keyof Schemas<O>
		? Schemas<O>[schemaName]
		: never
	: never
