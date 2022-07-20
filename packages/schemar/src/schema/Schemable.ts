// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'

import type { IRootSchema } from './IRootSchema.js'
import type { ISchema } from './ISchema.js'

export type InferableLiteral =
	| number
	| string
	| symbol
	| bigint
	| boolean
	| null
	| undefined

export type InferableMutableTuple = RootSchemable[]
export type InferableReadonlyTuple = readonly RootSchemable[]
export type InferableTuple = InferableMutableTuple | InferableReadonlyTuple

export type InferableObject = { [k: keyof any]: Schemable }

export type Inferable =
	| InferableObject
	| InferableTuple
	| InferableLiteral
	| Newable

export type Schemable = ISchema | Inferable
export type RootSchemable = IRootSchema | Inferable
