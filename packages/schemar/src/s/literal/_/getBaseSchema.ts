import * as s from "../..";
import { assert } from "@voltiso/ts-util";
import { InferableLiteral, ISchema } from "../../../schema.js";

export function getBaseSchema(inferableLiteral: InferableLiteral): ISchema {
	switch (typeof inferableLiteral) {
		case "bigint":
			return s.bigint;

		case "boolean":
			return s.boolean;

		case "function":
			return s.function;

		case "number":
			return s.number;

		case "string":
			return s.string;

		case "symbol":
			return s.symbol;

		case "object":
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			assert(inferableLiteral === null);
			return s.literal;

		case "undefined":
			return s.literal;
	}
}
