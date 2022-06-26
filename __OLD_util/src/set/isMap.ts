import { isObject } from "../object.js";

export function isMap(x: unknown): x is Map<unknown, unknown> {
	if (x instanceof Map) return true;

	if (!isObject(x)) return false;
	return x.constructor.name === "Map";
}
