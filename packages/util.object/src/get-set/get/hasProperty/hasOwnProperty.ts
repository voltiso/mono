/* eslint-disable @typescript-eslint/no-explicit-any */
import { assertNotPolluting } from "../../isPolluting";
import { isObject } from "../../../isObject";
import { VoltisoError } from "@voltiso/util.error";
import { toString } from "@voltiso/util.string";

export function hasOwnProperty<O extends object, K extends keyof any>(
	o: O,
	k: K
): k is K & keyof O {
	if (!isObject(o)) return false;
	assertNotPolluting(o, k);
	return Object.hasOwn(o, k);
}

export function assertHasOwnProperty<O extends object, K extends keyof any>(
	obj: O,
	key: K
): asserts key is K & keyof O {
	if (!hasOwnProperty(obj, key)) {
		throw new VoltisoError(
			`assertHasOwnProperty(${toString(obj)}, ${toString(key)}) failed`
		);
	}
}
