/* eslint-disable @typescript-eslint/ban-types */
import { lazyConstructor } from "@voltiso/ts-util/class";
import { GetObjectType_ } from "../../GetType.js";
import { InferableObject } from "../../schema.js";
import { CustomObject } from "./CustomObject.js";
import { Object_ } from "./Object_.js";
import { DefaultObjectOptions } from "./_/ObjectOptions.js";

export type Object<Shape extends InferableObject> = CustomObject<
	DefaultObjectOptions & {
		shape: Shape;
		_out: GetObjectType_<Shape, { kind: "out" }>;
		_in: GetObjectType_<Shape, { kind: "in" }>;
	}
>;

export const Object = lazyConstructor(
	() => Object_
) as unknown as ObjectConstructor;

type ObjectConstructor = new <Shape extends InferableObject>(
	shape: Shape
) => Object<Shape>;
