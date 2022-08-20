// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'

import type { Schemable, SchemableLike } from '~'

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

export type InferableObjectLike = { [k: keyof any]: SchemableLike }

export type InferableTupleLike = readonly SchemableLike[]

export type InferableLike =
	| InferableObjectLike
	| InferableTupleLike
	| InferableLiteral
	| Newable
