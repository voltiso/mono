import { Newable } from '@voltiso/ts-util/function'
import { IRootSchema } from './IRootSchema'
import { ISchema } from './ISchema'

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
