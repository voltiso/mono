import {
	CALL,
	callableInstance,
	lazyConstructor,
} from "@voltiso/ts-util/class";
import { ISchema } from "../../..";
import { InferableLiteral, Schema_ } from "../../../schema.js";
import { EXTENDS } from "../../../schema/_/symbols.js";
import { Literal_ } from "../Literal_.js";
import { CustomUnknownLiteral } from "./CustomUnknownLiteral.js";
import { isUnknownLiteral, IS_UNKNOWN_LITERAL } from "./IUnknownLiteral.js";
import * as s from "../..";
import {
	DefaultUnknownLiteralOptions,
	defaultUnknownLiteralOptions,
	UnknownLiteralOptions,
} from "./_/UnknownLiteralOptions";

class UnknownLiteral__<O extends UnknownLiteralOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomUnknownLiteral<O>
{
	readonly [IS_UNKNOWN_LITERAL] = true;

	constructor(o: O) {
		super(o);
		return callableInstance(this) as never;
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownLiteral(other)) return true;
		else return super[EXTENDS](other);
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x);
		return issues;
	}

	override _toString(): string {
		return "literal";
	}

	[CALL]<L extends InferableLiteral>(...literals: L[]): Literal_<L>;
	[CALL]<L extends InferableLiteral>(literals: Set<L>): Literal_<L>;
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal_<L>;

	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal_<L> {
		return new Literal_(...args);
	}
}

//

export class UnknownLiteral_ extends UnknownLiteral__<DefaultUnknownLiteralOptions> {
	constructor() {
		super(defaultUnknownLiteralOptions);
	}
}
