// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomBoolean,
	CustomLiteral,
	CustomNever,
	CustomNumber,
	CustomObject,
	CustomString,
	CustomSymbol,
	CustomUnion,
	CustomUnknown,
	CustomUnknownLiteral,
	CustomUnknownObject,
	CustomUnknownSchema,
	CustomVoid,
	ISchema,
} from '~'

export const SCHEMA_NAME = Symbol('SCHEMA_NAME')
export type SCHEMA_NAME = typeof SCHEMA_NAME

export interface Schemas<O = {}> {
	Never: CustomNever<O>
	// String: CustomString<O>
	Number: CustomNumber<O>
	// Boolean: CustomBoolean<O>
	// Literal: CustomLiteral<O>
	// UnknownLiteral: CustomUnknownLiteral<O>
	// Symbol: CustomSymbol<O>
	// Void: CustomVoid<O>
	// Object: CustomObject<O>
	// UnknownObject: CustomUnknownObject<O>
	// Union: CustomUnion<O>
	// Unknown: CustomUnknown<O>
	// UnknownSchema: CustomUnknownSchema<O>
}

export type SchemaName = keyof Schemas

export type GetSchemaByName<schemaName, O> = SchemaName extends schemaName
	? ISchema
	: schemaName extends keyof Schemas<O>
	? Schemas<O>[schemaName]
	: never
