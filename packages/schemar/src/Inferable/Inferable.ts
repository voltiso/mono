// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'

import type { Schemable, Schemable_ } from '~'

export type InferableLiteral =
	| number
	| string
	| symbol
	| bigint
	| boolean
	| null
	| undefined

export type InferableMutableTuple = Schemable[]
export type InferableReadonlyTuple = readonly Schemable[]
export type InferableTuple = InferableMutableTuple | InferableReadonlyTuple

export type InferableObject = { [k: keyof any]: Schemable }

export type Inferable =
	| InferableObject
	| InferableTuple
	| InferableLiteral
	| Newable

//

export type InferableObject_ = { [k: keyof any]: Schemable_ }

export type InferableTuple_ = readonly Schemable_[]

export type Inferable_ =
	| InferableObject_
	| InferableTuple_
	| InferableLiteral
	| Newable
