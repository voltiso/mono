/* eslint-disable @typescript-eslint/ban-types */
import {
	CALL,
	callableInstance,
	lazyConstructor,
} from "@voltiso/ts-util/class";
import { ISchema, OPTIONS, Schema_ } from "../../schema.js";
import { EXTENDS } from "../../schema/_/symbols.js";
import {
	DefaultNumberOptions,
	defaultNumberOptions,
	NumberOptions,
} from "./_/NumberOptions";
import { CustomNumber } from "./CustomNumber.js";
import { isNumber, IS_NUMBER } from "./INumber.js";
import { OmitCall } from "@voltiso/ts-util/object";
import * as s from "..";

class Number__<O extends NumberOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements OmitCall<CustomNumber<O>>
{
	readonly [IS_NUMBER] = true as const;

	get isInteger() {
		return this[OPTIONS].integer;
	}

	get getMin() {
		return this[OPTIONS].min;
	}

	get getMax() {
		return this[OPTIONS].max;
	}

	constructor(o: O) {
		super(o);
		return callableInstance(this) as never;
	}

	// private _CALL<L extends number>(...literals: L[]): Literal<L>
	// private _CALL<L extends number>(literals: Set<L>): Literal<L>
	// private _CALL<L extends number>(...args: L[] | [Set<L>]): Literal<L>

	[CALL]<L extends number>(...args: L[] | [Set<L>]): s.Literal<L> {
		return s.literal(...args);
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isNumber(other)) return true;
		else return super[EXTENDS](other);
	}

	protected override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x);

		if (typeof x !== "number")
			issues.push(
				new s.ValidationIssue({
					expectedDescription: "be number",
					received: x,
				})
			);
		else {
			if (this.isInteger && !global.Number.isInteger(x)) {
				issues.push(
					new s.ValidationIssue({
						expectedDescription: "integer",
						received: x,
					})
				);
			}

			if (typeof this.getMin !== "undefined" && x < this.getMin) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at least ${this.getMin}`,
						received: x,
					})
				);
			}

			if (typeof this.getMax !== "undefined" && x > this.getMax) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at most ${this.getMax}`,
						received: x,
					})
				);
			}
		}

		return issues;
	}

	override _toString(): string {
		return "number";
	}

	get integer(): never {
		return this._cloneWithOptions({ integer: true as const }) as never;
	}

	min<MinValue extends number>(min: MinValue): never {
		// assert(typeof this.getMin === 'undefined', 'cannot call `min` twice')
		return this._cloneWithOptions({ min }) as never;
	}

	max<MaxValue extends number>(max: MaxValue): never {
		// assert(typeof this.getMax === 'undefined', 'cannot call `max` twice')
		return this._cloneWithOptions({ max }) as never;
	}

	range<MinValue extends number, MaxValue extends number>(
		minValue: MinValue,
		maxValue: MaxValue
	): never {
		// assert(typeof this.getMin === 'undefined', 'cannot call `min` twice')
		// assert(typeof this.getMax === 'undefined', 'cannot call `max` twice')
		return this._cloneWithOptions({ min: minValue, max: maxValue }) as never;
	}
}

//

export class Number_ extends Number__<DefaultNumberOptions> {
	constructor() {
		super(defaultNumberOptions as never);
	}
}
