// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'

import { _schema } from './_'

export const schema = _schema as t.UnknownSchema
export const unknown = _schema as t.Unknown

export const tuple = _schema as t.MutableUnknownTuple
export const readonlyTuple = _schema as t.ReadonlyUnknownTuple

export const array = _schema as t.MutableArray<t.Unknown>
export const readonlyArray = _schema as t.ReadonlyArray<t.Unknown>

const function_ = _schema as t.UnknownFunction
export { function_ as function }

const void_ = _schema as t.Void
export { void_ as void }

export const any = _schema as t.Any
export const symbol = _schema as t.UnknownSymbol
export const string = _schema as t.String

export const number = _schema as t.Number
export const integer = _schema as t.CustomNumber<{
	isInteger: true
}>

export const bigint = _schema as t.Bigint
export const boolean = _schema as t.Boolean

export const instance = _schema as <Inst extends object>(
	Constructor: new (...args: any[]) => Inst,
) => t.Instance<Inst>

export const literal = _schema as t.UnknownLiteral
export const never = _schema as t.Never

const null_ = _schema as t.Literal<null>
export { null_ as null }

export const object = _schema as t.UnknownObject
export const record = _schema as t.UnknownRecord

const undefined_ = _schema as t.Literal<undefined>
export { undefined_ as undefined }

export const union = _schema as <Ts extends t.SchemableLike[]>(
	...types: Ts
) => t.Union<Ts>

export const optional = _schema as t.CustomUnknown<{
	isOptional: true
}>

export const readonly = _schema as t.CustomUnknown<{
	isReadonly: true
}>
