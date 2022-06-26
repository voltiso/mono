import { array } from "../../array.js";
import { optional } from "../../misc.js";
import { number } from "../../number.js";
import { string } from "../../string.js";
import { union } from "../../union.js";
import { function as function_ } from "../../function.js";
import { tuple } from "../../tuple.js";
import { lazyValue } from "@voltiso/ts-util";

export const validationIssue = lazyValue(() => ({
	path: array(union(string, number)),
	name: string.optional,

	expectedOneOf: array.optional,
	expectedDescription: string.optional,

	received: optional,
	receivedDescription: string.optional,

	toString: function_(tuple(), string),
}));
