// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
	BoundCallable,
	CALL,
	isDefined,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import type { Literal } from '~/core-schemas/literal/Literal'
import { literal } from '~/core-schemas/unknownLiteral/UnknownLiteral'
import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'

import type { BigintOptions } from './BigintOptions'
import type { CustomBigint } from './CustomBigint'
import { isBigintSchema } from './IBigint'

$fastAssert(SCHEMA_NAME)
$fastAssert(EXTENDS)
$fastAssert(OPTIONS)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomBigintImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: BigintOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: BigintOptions.Default

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [Voltiso.OPTIONS]: Assume<
	// 	BigintOptions,
	// 	MergeSchemaOptions<DefaultBigintOptions, O>
	// >
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomBigintImpl<O extends Partial<BigintOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomBigint<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Bigint' as const

	get getMin(): this[Voltiso.OPTIONS]['min'] {
		return this[Voltiso.OPTIONS].min as never
	}

	get getMax(): this[Voltiso.OPTIONS]['max'] {
		return this[Voltiso.OPTIONS].max as never
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	[CALL]<L extends bigint>(...literals: L[]): Literal<L>
	[CALL]<L extends bigint>(literals: Set<L>): Literal<L>
	[CALL]<L extends bigint>(...args: L[] | [Set<L>]): Literal<L>

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	[CALL]<L extends bigint>(...args: L[] | [Set<L>]): Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return literal<L>(literals as never) as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isBigintSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
	}

	override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value === 'bigint') {
			if (
				isDefined(this.getMin) &&
				((value < this.getMin) as unknown as number)
			) {
				issues.push(
					new ValidationIssue({
						name: this[Voltiso.OPTIONS].name,
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expected: { description: `at least ${this.getMin}` },
						received: { value },
					}),
				)
			}

			if (
				isDefined(this.getMax) &&
				((value > this.getMax) as unknown as number)
			) {
				issues.push(
					new ValidationIssue({
						name: this[Voltiso.OPTIONS].name,
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expected: { description: `at most ${this.getMax}` },
						received: { value },
					}),
				)
			}
		} else {
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'bigint' },
					received: { value },
				}),
			)
		}

		return issues
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override _toString(): string {
		return 'bigint'
	}

	min<MinValue extends bigint>(min: MinValue): never {
		// assert(this.getMin === undefined, 'cannot call `min` twice')
		return this._cloneWithOptions({ min }) as never
	}

	max<MaxValue extends bigint>(max: MaxValue): never {
		// assert(this.getMax === undefined, 'cannot call `max` twice')
		return this._cloneWithOptions({ max }) as never
	}

	range<MinValue extends bigint, MaxValue extends bigint>(
		min: MinValue,
		max: MaxValue,
	): never {
		return this._cloneWithOptions({ min, max }) as never
	}
}
