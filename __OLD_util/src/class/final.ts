import { assumeType } from "../misc/assumeType";
import { VoltisoError } from "../error";
import { hasProperty } from "../object";
import { UnknownProperty } from "../object/UnknownProperty";
import { toString } from "../string";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MethodKey<O> = string &
	{
		[k in keyof O]: O[k] extends (this: O, ...args: never[]) => unknown
			? k
			: never;
	}[keyof O];

export function final<
	Base extends object,
	Keys extends (keyof Base | UnknownProperty)[]
>(
	thisArg: Record<MethodKey<Base>, unknown>,
	Base: {
		prototype: Base;
		name: string;
	},
	...keys: Keys
): void {
	for (const m of keys) {
		if (
			!hasProperty(Base.prototype, m) ||
			typeof Base.prototype[m] !== "function"
		) {
			throw new VoltisoError(`${toString(m)} is not a method in ${Base.name}`);
		}

		assumeType<MethodKey<Base>>(m);

		if (thisArg[m] !== Base.prototype[m]) {
			throw new VoltisoError(
				`method ${toString(m)} is final (cannot override)`
			);
		}
	}
}
