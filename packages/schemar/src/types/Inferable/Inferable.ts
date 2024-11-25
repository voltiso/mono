// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
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
// eslint-disable-next-line sonarjs/redundant-type-aliases
export type InferableTuple =
	InferableReadonlyTuple /* | InferableMutableTuple */

export type InferableObject = object & { [k: keyof any]: Schemable }

export type IInferable =
	| InferableObject
	| InferableTuple
	| InferableLiteral
	| Newable

/** Note: If subtype of `InferableLiteral`, returns `never` for non-literals */
export type Inferable<T = unknown> = unknown extends T
	? IInferable
	: T extends InferableLiteral
		? string extends T
			? never
			: number extends T
				? never
				: bigint extends T
					? never
					: boolean extends T
						? never
						: symbol extends T
							? never
							: null extends T
								? never
								: undefined extends T
									? never
									: T
		: T extends Newable
			? T
			: T extends InferableObject
				? T
				: T extends InferableTuple
					? T
					: object extends T
						? T
						: never

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

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type $$InferableTuple =
	// | $$InferableMutableTuple
	$$InferableReadonlyTuple

export type $$Inferable =
	| $$InferableObject
	| $$InferableTuple
	| InferableLiteral
	| Newable
