// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomNumber,
	DEFAULT_OPTIONS,
	DefaultNumberOptions,
	ISchema,
	NumberOptions,
} from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import { EXTENDS, OPTIONS, SCHEMA_NAME } from '@voltiso/schemar.types'
import { isDefined, lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl, ValidationIssue } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomNumberImpl<O> {
	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: DefaultNumberOptions
}

export class CustomNumberImpl<O extends Partial<NumberOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomNumber<O>
{
	readonly [SCHEMA_NAME] = 'Number' as const

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
		if (t.isNumber(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	protected override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x === 'number') {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (this.isInteger && !global.Number.isInteger(x)) {
				issues.push(
					new ValidationIssue({
						expectedDescription: 'integer',
						received: x,
					}),
				)
			}

			if (isDefined(this.getMin) && x < this.getMin) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at least ${this.getMin}`,
						received: x,
					}),
				)
			}

			if (isDefined(this.getMax) && x > this.getMax) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at most ${this.getMax}`,
						received: x,
					}),
				)
			}
		} else {
			issues.push(
				new ValidationIssue({
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
