/* eslint-disable @typescript-eslint/ban-types */
import {
	CALL,
	callableInstance,
	lazyConstructor,
} from "@voltiso/ts-util/class";
import { ISchema, Schema_ } from "../../schema.js";
import { EXTENDS } from "../../schema/_/symbols.js";
import { isUnion } from "../union.js";
import { collectTrueFalse } from "./_/collectTrueFalse.js";
import { isLiteral, isUnknownLiteral } from "../literal.js";
import { CustomBoolean } from "./CustomBoolean.js";
import { isBoolean, IS_BOOLEAN } from "./IBoolean.js";
import {
	BooleanOptions,
	defaultBooleanOptions,
	DefaultBooleanOptions,
} from "./_/BooleanOptions";
import * as s from "..";

class Boolean__<O extends BooleanOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomBoolean<O>
{
	readonly [IS_BOOLEAN] = true as const;

	constructor(o: O) {
		super(o);
		return callableInstance(this) as never;
	}

	[CALL]<L extends boolean>(...literals: L[]): s.Literal<L>;
	[CALL]<L extends boolean>(literals: Set<L>): s.Literal<L>;
	[CALL]<L extends boolean>(...args: L[] | [Set<L>]): s.Literal<L>;

	[CALL]<L extends boolean>(...args: L[] | [Set<L>]): s.Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[]);
		return s.literal(literals);
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isBoolean(other)) return true;
		else if (isUnknownLiteral(other)) return true;
		else if (isLiteral(other) || isUnion(other)) {
			const { haveTrue, haveFalse } = collectTrueFalse(other);
			return haveTrue && haveFalse;
		} else return super[EXTENDS](other);
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x);

		if (typeof x !== "boolean")
			issues.push(
				new s.ValidationIssue({
					expectedDescription: "boolean",
					received: x,
				})
			);

		return issues;
	}

	override _toString(): string {
		return "boolean";
	}
}

export class Boolean_ extends Boolean__<DefaultBooleanOptions> {
	constructor() {
		super(defaultBooleanOptions as never);
	}
}
