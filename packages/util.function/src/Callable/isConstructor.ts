import type { Constructor } from "./Constructor.js";

export function isConstructor(x: unknown): x is Constructor {
	return (
		typeof x === "function" && typeof (x as Constructor).prototype === "object"
	);
}
