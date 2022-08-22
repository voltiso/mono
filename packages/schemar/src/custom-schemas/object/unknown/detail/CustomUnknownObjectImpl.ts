// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type BASE_OPTIONS,
	type DEFAULT_OPTIONS,
	EXTENDS,
	OPTIONS,
	SCHEMA_NAME,
} from '_'
import { CALL, callableInstance, getKeys, lazyConstructor } from '@voltiso/util'

import type {
	CustomUnknownObject,
	DefaultUnknownObjectOptions,
	InferableObject,
	ISchema,
	UnknownObjectOptions,
} from '~'
import { CustomObjectImpl, defaultObjectOptions } from '~'
import { CustomSchemaImpl, isObject, isUnknownObject, Object } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownObjectImpl<O> {
	readonly [SCHEMA_NAME]: 'UnknownObject'

	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions
	readonly [BASE_OPTIONS]: UnknownObjectOptions
}

export class CustomUnknownObjectImpl<O extends Partial<UnknownObjectOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownObject<O>
{
	readonly [SCHEMA_NAME] = 'UnknownObject' as const

	// declare readonly [PARTIAL_OPTIONS]: O;

	// declare readonly [OPTIONS]: Assume<
	// 	UnknownObjectOptions,
	// 	MergeSchemaOptions<DefaultUnknownObjectOptions, O>
	// >

	// eslint-disable-next-line class-methods-use-this
	get getIndexSignatures() {
		return [] as []
	}

	// eslint-disable-next-line class-methods-use-this
	get getShape() {
		return {}
	}

	index(...args: any) {
		const r = new CustomObjectImpl({
			...defaultObjectOptions,
			// eslint-disable-next-line security/detect-object-injection
			...this[OPTIONS],
		})
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return r.index(...args)
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/ban-types
	[CALL]<S extends InferableObject>(shape: S): Object<S> {
		return new Object(shape) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isObject(other)) {
			return getKeys(other.getShape).length === 0
		} else if (isUnknownObject(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}
}
