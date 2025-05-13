// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'

import { _schema } from './_'

export const schema = _schema as typeof s.schema
export const unknown = _schema as typeof s.unknown

export const tuple = _schema as typeof s.tuple
export const readonlyTuple = _schema as typeof s.readonlyTuple

export const array = _schema as typeof s.array
export const readonlyArray = _schema as typeof s.readonlyArray

// eslint-disable-next-line sonarjs/variable-name
const function_ = _schema as typeof s.function
export { function_ as function }

// eslint-disable-next-line sonarjs/variable-name
const void_ = _schema as typeof s.void
export { void_ as void }

export const any = _schema as typeof s.any
export const symbol = _schema as typeof s.symbol
export const string = _schema as typeof s.string

export const number = _schema as typeof s.number
export const integer = _schema as typeof s.integer

export const bigint = _schema as typeof s.bigint
export const boolean = _schema as typeof s.boolean

export const instance = _schema as typeof s.instance

export const literal = _schema as typeof s.literal
export const never = _schema as typeof s.never

// eslint-disable-next-line sonarjs/variable-name
const null_ = _schema as typeof s.null
export { null_ as null }

export const object = _schema as typeof s.object
export const record = _schema as typeof s.record

// eslint-disable-next-line sonarjs/variable-name
const undefined_ = _schema as typeof s.undefined
export { undefined_ as undefined }

export const or = _schema as typeof s.or
export const union = _schema as typeof s.union

export const and = _schema as typeof s.and
export const intersection = _schema as typeof s.intersection

export const optional = _schema as typeof s.optional
export const readonly = _schema as typeof s.readonly
