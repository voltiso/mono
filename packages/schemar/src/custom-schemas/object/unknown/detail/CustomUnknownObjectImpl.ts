// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type BASE_OPTIONS,
	type DEFAULT_OPTIONS,
	type SCHEMA_NAME,
	EXTENDS,
} from '_'
import { CALL, callableInstance, getKeys, lazyConstructor } from '@voltiso/util'

import type {
	CustomUnknownObject,
	DefaultUnknownObjectOptions,
	InferableObject,
	ISchema,
	UnknownObjectOptions,
} from '~'
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
	// declare readonly [PARTIAL_OPTIONS]: O;

	// declare readonly [OPTIONS]: Assume<
	// 	UnknownObjectOptions,
	// 	MergeSchemaOptions<DefaultUnknownObjectOptions, O>
	// >

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
