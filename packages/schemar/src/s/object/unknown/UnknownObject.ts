import { lazyValue } from "@voltiso/ts-util";
import { InferableObject } from "../../../schema.js";
import { CustomUnknownObject } from "./CustomUnknownObject.js";
import { DefaultUnknownObjectOptions } from "./_/UnknownObjectOptions.js";
import * as s from "../..";
import { UnknownObject_ } from "./UnknownObject_.js";
import { lazyConstructor } from "@voltiso/ts-util/class";

export interface UnknownObject
	extends CustomUnknownObject<DefaultUnknownObjectOptions> {
	<S extends InferableObject>(shape: S): s.Object<S>;
}

export const UnknownObject = lazyConstructor(
	() => UnknownObject_
) as unknown as UnknownObjectConstructor;

type UnknownObjectConstructor = new () => UnknownObject;

export const object = lazyValue(() => new UnknownObject());
