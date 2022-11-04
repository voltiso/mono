// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BigintOptions,
	CustomBigint,
	DefaultBigintOptions,
	ISchema,
	Literal,
} from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import { EXTENDS, SCHEMA_NAME } from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import {
	BoundCallable,
	CALL,
	isDefined,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import { literal } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomBigintImpl<O> {
	readonly [BASE_OPTIONS]: BigintOptions
	readonly [DEFAULT_OPTIONS]: DefaultBigintOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	BigintOptions,
	// 	MergeSchemaOptions<DefaultBigintOptions, O>
	// >
}

export class CustomBigintImpl<O extends Partial<BigintOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomBigint<O>
{
	readonly [SCHEMA_NAME] = 'Bigint' as const

	get getMin(): this[OPTIONS]['min'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['min'] as never
	}

	get getMax(): this[OPTIONS]['max'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['max'] as never
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	[CALL]<L extends bigint>(...literals: L[]): Literal<L>
	[CALL]<L extends bigint>(literals: Set<L>): Literal<L>
	[CALL]<L extends bigint>(...args: L[] | [Set<L>]): Literal<L>

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends bigint>(...args: L[] | [Set<L>]): Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return literal<L>(literals as never) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (t.isBigint(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'bigint')
			issues.push(
				new ValidationIssue({
					expectedDescription: 'bigint',
					received: x,
				}),
			)
		else {
			if (isDefined(this.getMin) && ((x < this.getMin) as unknown as number)) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at least ${this.getMin}`,
						received: x,
					}),
				)
			}

			if (isDefined(this.getMax) && ((x > this.getMax) as unknown as number)) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at most ${this.getMax}`,
						received: x,
					}),
				)
			}
		}

		return issues
	}

	// eslint-disable-next-line class-methods-use-this
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
