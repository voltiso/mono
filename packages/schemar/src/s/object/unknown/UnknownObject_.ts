/* eslint-disable @typescript-eslint/ban-types */
import {
	lazyConstructor,
	callableInstance,
	CALL,
} from "@voltiso/ts-util/class";
import {
	defaultSchemaOptions,
	InferableObject,
	ISchema,
	Schema_,
} from "../../../schema";
import { EXTENDS } from "../../../schema/_/symbols.js";
import { isObject, Object } from "..";
import { getKeys } from "@voltiso/ts-util/object";
import { isUnknownObject, IS_UNKNOWN_OBJECT } from "./IUnknownObject.js";
import { CustomUnknownObject } from "./CustomUnknownObject.js";
import {
	DefaultUnknownObjectOptions,
	UnknownObjectOptions,
} from "./_/UnknownObjectOptions";

class UnknownObject__<O extends UnknownObjectOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomUnknownObject<O>
{
	readonly [IS_UNKNOWN_OBJECT] = true as const;

	constructor(o: O) {
		super(o);
		return callableInstance(this) as never;
	}

	[CALL]<S extends InferableObject>(shape: S): Object<S> {
		return new Object(shape) as never;
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isObject(other)) {
			return getKeys(other.getShape).length === 0;
		} else if (isUnknownObject(other)) return true;
		else return super[EXTENDS](other);
	}
}

export class UnknownObject_ extends UnknownObject__<DefaultUnknownObjectOptions> {
	constructor() {
		super(defaultSchemaOptions as never);
	}
}
