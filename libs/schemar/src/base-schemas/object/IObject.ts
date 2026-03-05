// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/complexity/noBannedTypes: . */

import { SCHEMA_NAME } from '_'

import type {
	$$Schema,
	$$Schemable,
	ObjectIndexSignatureEntry,
	ObjectOptions,
	Schema,
	Schema$,
} from '~'

export interface $$Object extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Object'
}

export interface IObject extends $$Object, Schema {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Object'

	readonly [Voltiso.OPTIONS]: ObjectOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: ObjectOptions.Default

	get isPlain(): boolean

	get getShape(): {} // InferableObjectLike
	get getDeepShape(): {} // InferableObjectLike

	get getIndexSignatures(): ObjectIndexSignatureEntry[]
}

export interface IObject$ extends $$Object, Schema$ {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Object'

	readonly [Voltiso.OPTIONS]: ObjectOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: ObjectOptions.Default

	get isPlain(): boolean

	get getShape(): {} // InferableObjectLike
	get getDeepShape(): {} // InferableObjectLike

	get getIndexSignatures(): ObjectIndexSignatureEntry[]

	//

	get Final(): IObject

	get partial(): $$Object
	get strictPartial(): $$Object

	get deepPartial(): $$Object
	get deepStrictPartial(): $$Object

	get plain(): $$Object

	index(key: $$Schemable, value: $$Schemable): $$Object
	index(value: $$Schemable): $$Object
}

export function isObjectSchema(x: unknown): x is IObject$ {
	return (x as IObject | null)?.[SCHEMA_NAME] === 'Object'
}

export function is$$ObjectSchema(x: unknown): x is $$Object {
	return isObjectSchema(x)
}
