/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { merge } from "@voltiso/util.object";
import { toString } from "..";
import { defaultToStringParams, ToStringParams } from "./ToStringParams";

const baseResult = "[]";
const baseShortResult = "[...]";

function append(str: string, x: string) {
	if (str === baseResult) return `[${x}]`;
	else return `${str.slice(0, -1)}, ${x}]`;
}

export function stringFromArray_(arr: unknown[], params: ToStringParams) {
	if (arr.length === 0) return "[]";

	let result = baseResult;
	let shortResult = baseShortResult;

	for (const v of arr) {
		const cand = append(result, toString(v));
		const shortCand =
			result === baseResult ? shortResult : append(result, "... ");

		if (cand.length > params.maxLength) {
			if (shortCand.length > params.maxLength) return shortResult;
			else return shortCand;
		}

		result = cand;
		shortResult = shortCand;
	}

	return result;
}

export function stringFromArray(
	arr: unknown[],
	params?: Partial<ToStringParams> | undefined
) {
	const p = merge(defaultToStringParams, params);
	return stringFromArray_(arr, p);
}
