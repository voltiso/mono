// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */

import type { OmitCall } from '@voltiso/util'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { ISchema } from '../../schema'
import { OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import * as s from '..'
import type { DefaultNumberOptions, NumberOptions } from './_/NumberOptions.js'
import { defaultNumberOptions } from './_/NumberOptions.js'
import type { CustomNumber } from './CustomNumber.js'
import { IS_NUMBER, isNumber } from './INumber.js'

class Number__<O extends NumberOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements OmitCall<CustomNumber<O>>
{
	readonly [IS_NUMBER] = true as const

	get isInteger() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isInteger
	}

	get getMin() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].min
	}

	get getMax() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].max
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// private _CALL<L extends number>(...literals: L[]): Literal<L>
	// private _CALL<L extends number>(literals: Set<L>): Literal<L>
	// private _CALL<L extends number>(...args: L[] | [Set<L>]): Literal<L>

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends number>(...args: L[] | [Set<L>]): s.Literal<L> {
		return s.literal(...args)
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isNumber(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	protected override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x === 'number') {
			if (this.isInteger && !global.Number.isInteger(x)) {
				issues.push(
					new s.ValidationIssue({
						expectedDescription: 'integer',
						received: x,
					}),
				)
			}

			if (typeof this.getMin !== 'undefined' && x < this.getMin) {
				issues.push(
					new s.ValidationIssue({
						expectedDescription: `at least ${this.getMin}`,
						received: x,
					}),
				)
			}

			if (typeof this.getMax !== 'undefined' && x > this.getMax) {
				issues.push(
					new s.ValidationIssue({
						expectedDescription: `at most ${this.getMax}`,
						received: x,
					}),
				)
			}
		} else {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be number',
					received: x,
				}),
			)
		}

		return issues
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'number'
	}

	get integer(): never {
		return this._cloneWithOptions({ isInteger: true as const }) as never
	}

	min<MinValue extends number>(min: MinValue): never {
		// assert(typeof this.getMin === 'undefined', 'cannot call `min` twice')
		return this._cloneWithOptions({ min }) as never
	}

	max<MaxValue extends number>(max: MaxValue): never {
		// assert(typeof this.getMax === 'undefined', 'cannot call `max` twice')
		return this._cloneWithOptions({ max }) as never
	}

	range<MinValue extends number, MaxValue extends number>(
		minValue: MinValue,
		maxValue: MaxValue,
	): never {
		// assert(typeof this.getMin === 'undefined', 'cannot call `min` twice')
		// assert(typeof this.getMax === 'undefined', 'cannot call `max` twice')
		return this._cloneWithOptions({ min: minValue, max: maxValue }) as never
	}
}

//

export class Number_ extends Number__<DefaultNumberOptions> {
	constructor() {
		super(defaultNumberOptions as never)
	}
}
