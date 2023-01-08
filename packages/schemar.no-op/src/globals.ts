// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'

import { _schema } from './_'

export const schema = _schema as s.SchemaInferrer
export const unknown = _schema as s.Unknown

export const tuple = _schema as s.MutableUnknownTuple
export const readonlyTuple = _schema as s.ReadonlyUnknownTuple

export const array = _schema as s.MutableArray<s.Unknown>
export const readonlyArray = _schema as s.ReadonlyArray<s.Unknown>

const function_ = _schema as s.UnknownFunction
export { function_ as function }

const void_ = _schema as s.Void
export { void_ as void }

export const any = _schema as s.Any
export const symbol = _schema as s.UnknownSymbol
export const string = _schema as s.String

export const number = _schema as s.Number
export const integer = _schema as s.CustomNumber<{
	isInteger: true
}>

export const bigint = _schema as s.Bigint
export const boolean = _schema as s.Boolean

export const instance = _schema as <Inst extends object>(
	Constructor: new (...args: any[]) => Inst,
) => s.Instance<Inst>

export const literal = _schema as s.UnknownLiteral
export const never = _schema as s.Never

const null_ = _schema as s.Literal<null>
export { null_ as null }

export const object = _schema as s.UnknownObject
export const record = _schema as s.UnknownRecord

const undefined_ = _schema as s.Literal<undefined>
export { undefined_ as undefined }

export const union = _schema as <Ts extends s.$$Schemable[]>(
	...types: Ts
) => s.Union<Ts>

export const optional = _schema as s.CustomUnknown<{
	isOptional: true
}>

export const readonly = _schema as s.CustomUnknown<{
	isReadonly: true
}>
