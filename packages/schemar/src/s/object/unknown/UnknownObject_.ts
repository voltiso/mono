// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-types */

import { CALL, callableInstance, getKeys, lazyConstructor } from '@voltiso/util'

import type { InferableObject, ISchema } from '../../../schema'
import { defaultSchemaOptions, Schema_ } from '../../../schema'
import { EXTENDS } from '../../../schema/_/symbols.js'
import { isObject, Object } from '..'
import type {
	DefaultUnknownObjectOptions,
	UnknownObjectOptions,
} from './_/UnknownObjectOptions.js'
import type { CustomUnknownObject } from './CustomUnknownObject.js'
import { IS_UNKNOWN_OBJECT, isUnknownObject } from './IUnknownObject.js'

class UnknownObject__<O extends UnknownObjectOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomUnknownObject<O>
{
	readonly [IS_UNKNOWN_OBJECT] = true as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
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

export class UnknownObject_ extends UnknownObject__<DefaultUnknownObjectOptions> {
	constructor() {
		super(defaultSchemaOptions as never)
	}
}
