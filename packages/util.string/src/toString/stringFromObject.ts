/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getEntries, merge } from "@voltiso/util.object";
import { defaultToStringParams, ToStringParams } from "./ToStringParams";
import { toString } from "./toString";

function stringFromProperty(property: keyof any): string {
	if (typeof property === "symbol") return `[${property.toString()}]`;
	else return property as string; // numbers coerced to strings anyway
}

const baseObjStr = "{ }";

function append(str: string, x: string): string {
	if (str === baseObjStr) return `{ ${x} }`;
	else return `${str.slice(0, -2)}, ${x} }`;
}

export function stringFromObject_(
	obj: Record<keyof any, unknown>,
	params: ToStringParams
) {
	const entries = getEntries(obj, params);
	if (entries.length === 0) return "{}";

	let result = baseObjStr;
	let shortResult = "{...}";

	for (const entry of entries) {
		const [property, value] = entry;

		const propertyStr = stringFromProperty(property);

		const cand = append(result, `${propertyStr}: ${toString(value)}`);
		const shortCand =
			result === baseObjStr ? shortResult : append(result, "...");

		if (cand.length > params.maxLength) {
			if (shortCand.length > params.maxLength) return shortResult;
			else return shortCand;
		}

		result = cand;
		shortResult = shortCand;
	}

	const { name } = obj.constructor;

	if (["Object"].includes(name)) return result;
	else return `${name} ${result}`;
}

export function stringFromObject(
	f: Record<keyof any, unknown>,
	params?: Partial<ToStringParams> | undefined
) {
	const p = merge(defaultToStringParams, params);
	return stringFromObject_(f, p);
}
