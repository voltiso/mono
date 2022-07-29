// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined, isNumber, lazyConstructor } from '@voltiso/util'

import type {
	CustomNumber,
	DefaultNumberOptions,
	ISchema,
	NumberOptions,
} from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	OPTIONS,
	SCHEMA_NAME,
} from '~'
import * as s from '~/schemas'

export class CustomNumberImpl<O extends Partial<NumberOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomNumber<O>
{
	declare readonly [SCHEMA_NAME]: 'Number';
	declare readonly [BASE_OPTIONS]: NumberOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultNumberOptions

	get isInteger(): this[OPTIONS]['isInteger'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isInteger as never
	}

	get getMin(): this[OPTIONS]['min'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].min as never
	}

	get getMax(): this[OPTIONS]['max'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].max as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isNumber(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	protected override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x === 'number') {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (this.isInteger && !global.Number.isInteger(x)) {
				issues.push(
					new s.ValidationIssue({
						expectedDescription: 'integer',
						received: x,
					}),
				)
			}

			if (isDefined(this.getMin) && x < this.getMin) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at least ${this.getMin}`,
						received: x,
					}),
				)
			}

			if (isDefined(this.getMax) && x > this.getMax) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
