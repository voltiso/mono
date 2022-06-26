import type { OmitSimple } from "./OmitSimple";
import { VoltisoError } from "@voltiso/util.error";
import { toString } from "@voltiso/util.string";
import { omitIfPresent } from "./omitIfPresent";

// export function omit<O extends object, K extends keyof O>(
// 	obj: O,
// 	key: K
// ): VOmit<O, K>

// export function omit<O extends object, K extends keyof O>(
// 	obj: O,
// 	...keys: K[]
// ): VOmit<O, K>

export function omit<O extends object, K extends keyof O>(
	obj: O,
	...keys: K[]
): OmitSimple<O, K> {
	for (const key of keys) {
		if (!Object.hasOwn(obj, key)) {
			throw new VoltisoError(
				`omit(${toString(obj)}, ${toString(keys)}): key ${toString(
					key
				)} does not exist`
			);
		}
	}
	return omitIfPresent(obj, ...keys);
}
