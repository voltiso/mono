// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, getKeys, lazyConstructor } from '@voltiso/util'

import type {
	CustomUnknownObject,
	DefaultUnknownObjectOptions,
	InferableObject,
	ISchema,
	UnknownObjectOptions,
} from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isUnknownObject,
	SCHEMA_NAME,
} from '~'
import * as s from '~/schemas'

export class CustomUnknownObjectImpl<O extends Partial<UnknownObjectOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownObject<O>
{
	declare readonly [SCHEMA_NAME]: 'UnknownObject';

	declare readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions;
	declare readonly [BASE_OPTIONS]: UnknownObjectOptions

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

	// eslint-disable-next-line class-methods-use-this
	[CALL]<S extends InferableObject>(shape: S): s.Object<S> {
		return new s.Object(shape) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (s.isObject(other)) {
			return getKeys(other.getShape).length === 0
		} else if (isUnknownObject(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}
}
