// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'

import type {
	$$Object,
	$$Schemable,
	$$Tuple,
	IObject,
	ITuple,
	Rest,
	Schemable,
} from '~'

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
export type InferableTuple =
	InferableReadonlyTuple /* | InferableMutableTuple */

export type InferableObject = object & { [k: keyof any]: Schemable }

export type Inferable =
	| InferableObject
	| InferableTuple
	| InferableLiteral
	| Newable

//

export type SchemableObject = InferableObject | IObject
export type $$SchemableObject = $$InferableObject | $$Object

export type SchemableTuple = InferableTuple | ITuple
export type $$SchemableTuple = $$InferableTuple | $$Tuple

export type $$InferableObject = object & { [k: keyof any]: $$Schemable }

export type $$InferableMutableTuple = $$Schemable[] | ($$Schemable | Rest)[]

export type $$InferableReadonlyTuple =
	| readonly $$Schemable[]
	| readonly ($$Schemable | Rest)[]

//

export type $$InferableTuple =
	// | $$InferableMutableTuple
	$$InferableReadonlyTuple

export type $$Inferable =
	| $$InferableObject
	| $$InferableTuple
	| InferableLiteral
	| Newable
