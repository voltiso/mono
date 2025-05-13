// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	ObjectIndexSignatureEntry,
	ObjectOptions,
	Schema,
	Schema$,
} from '~'

export interface $$Object extends $$Schema {
	readonly [SCHEMA_NAME]: 'Object'
}

export interface IObject extends $$Object, Schema {
	//
	readonly [SCHEMA_NAME]: 'Object'

	readonly [OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: ObjectOptions.Default

	get isPlain(): boolean

	get getShape(): {} // InferableObjectLike
	get getDeepShape(): {} // InferableObjectLike

	get getIndexSignatures(): ObjectIndexSignatureEntry[]
}

export interface IObject$ extends $$Object, Schema$ {
	//
	readonly [SCHEMA_NAME]: 'Object'

	readonly [OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: ObjectOptions.Default

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

	// eslint-disable-next-line @typescript-eslint/unified-signatures
	index(key: $$Schemable, value: $$Schemable): $$Object
	index(value: $$Schemable): $$Object
}

export function isObjectSchema(x: unknown): x is IObject$ {
	return (x as IObject | null)?.[SCHEMA_NAME] === 'Object'
}

export function is$$ObjectSchema(x: unknown): x is $$Object {
	return isObjectSchema(x)
}
