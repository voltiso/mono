// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert, isDefined, lazyConstructor, OPTIONS } from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'

import type { CustomNumber } from '../CustomNumber'
import { isNumberSchema } from '../isNumber'
import type { NumberOptions } from '../NumberOptions'

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomNumberImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: NumberOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NumberOptions.Default
}

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)
$fastAssert(OPTIONS)

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomNumberImpl<O extends Partial<NumberOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomNumber<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Number' as const

	get isInteger(): this[Voltiso.OPTIONS]['isInteger'] {
		return this[Voltiso.OPTIONS].isInteger as never
	}

	get getMin(): this[Voltiso.OPTIONS]['min'] {
		return this[Voltiso.OPTIONS].min as never
	}

	get getMax(): this[Voltiso.OPTIONS]['max'] {
		return this[Voltiso.OPTIONS].max as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isNumberSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
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
						name: this[Voltiso.OPTIONS].name,
						expected: { description: 'be integer' },
						received: { value },
					}),
				)
			}

			if (isDefined(this.getMin) && value < this.getMin) {
				issues.push(
					new ValidationIssue({
						name: this[Voltiso.OPTIONS].name,

						expected: { description: `be at least ${this.getMin}` },
						received: { value },
					}),
				)
			}

			if (isDefined(this.getMax) && value > this.getMax) {
				issues.push(
					new ValidationIssue({
						name: this[Voltiso.OPTIONS].name,

						expected: { description: `be at most ${this.getMax}` },
						received: { value },
					}),
				)
			}
		} else {
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'be number' },
					received: { value },
				}),
			)
		}

		return issues
	}

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
