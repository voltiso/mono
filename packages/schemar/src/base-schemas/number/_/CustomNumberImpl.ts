// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, isDefined, lazyConstructor, OPTIONS } from '@voltiso/util'

import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { ISchema } from '~/types/Schema/ISchema'

import type { CustomNumber } from '../CustomNumber'
import { isNumberSchema } from '../isNumber'
import type { NumberOptions } from '../NumberOptions'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomNumberImpl<O> {
	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: NumberOptions.Default
}

$assert(EXTENDS)
$assert(SCHEMA_NAME)

export class CustomNumberImpl<O extends Partial<NumberOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomNumber<O>
{
	readonly [SCHEMA_NAME] = 'Number' as const

	get isInteger(): this[OPTIONS]['isInteger'] {
		return this[OPTIONS].isInteger as never
	}

	get getMin(): this[OPTIONS]['min'] {
		return this[OPTIONS].min as never
	}

	get getMax(): this[OPTIONS]['max'] {
		return this[OPTIONS].max as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isNumberSchema(other)) return true
		else return super[EXTENDS](other)
	}

	constructor(options: O) {
		super(options)
		Object.freeze(this)
	}

	protected override _getIssues(value: unknown): ValidationIssue[] {
		const issues = []

		if (typeof value === 'number') {
			if (this.isInteger && !Number.isInteger(value)) {
				issues.push(
					new ValidationIssue({
						name: this[OPTIONS].name,
						expected: { description: 'integer' },
						received: { value },
					}),
				)
			}

			if (isDefined(this.getMin) && value < this.getMin) {
				issues.push(
					new ValidationIssue({
						name: this[OPTIONS].name,
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expected: { description: `at least ${this.getMin}` },
						received: { value },
					}),
				)
			}

			if (isDefined(this.getMax) && value > this.getMax) {
				issues.push(
					new ValidationIssue({
						name: this[OPTIONS].name,
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expected: { description: `at most ${this.getMax}` },
						received: { value },
					}),
				)
			}
		} else {
			issues.push(
				new ValidationIssue({
					name: this[OPTIONS].name,
					expected: { description: 'be number' },
					received: { value },
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
