import { assertNotPolluting } from "../isPolluting";
import type { UnknownProperty } from "../../UnknownProperty";
import type { Value } from "../../key-value";

type AllowedValue<
	Obj extends object,
	K extends keyof Obj | UnknownProperty
> = K extends keyof Obj ? Value<Obj, K> : unknown;

export function setProperty<
	Obj extends object,
	K extends keyof Obj | UnknownProperty,
	V extends AllowedValue<Obj, K>
>(obj: Obj, property: K, value: V) {
	assertNotPolluting(obj, property);
	obj[property as keyof Obj] = value as never;
}
