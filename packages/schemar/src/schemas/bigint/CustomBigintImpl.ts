// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'
import {
	CALL,
	callableInstance,
	isDefined,
	lazyConstructor,
} from '@voltiso/util'

import type {
	DefaultBigintOptions,
	ISchema,
	MergeSchemaOptions,
	ValidationIssue,
} from '~'
import {
	type BigintOptions,
	type CustomBigint,
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isBigint,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '~'
import * as s from '~/schemas'

export class CustomBigintImpl<O extends Partial<BigintOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomBigint<O>
{
	declare readonly [SCHEMA_NAME]: 'Bigint';

	declare readonly [BASE_OPTIONS]: BigintOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultBigintOptions;

	declare readonly [PARTIAL_OPTIONS]: O;

	declare readonly [OPTIONS]: Assume<
		BigintOptions,
		MergeSchemaOptions<DefaultBigintOptions, O>
	>

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
		return callableInstance(this) as never
	}

	[CALL]<L extends bigint>(...literals: L[]): s.Literal<L>
	[CALL]<L extends bigint>(literals: Set<L>): s.Literal<L>
	[CALL]<L extends bigint>(...args: L[] | [Set<L>]): s.Literal<L>

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends bigint>(...args: L[] | [Set<L>]): s.Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return s.literal(literals)
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isBigint(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'bigint')
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'bigint',
					received: x,
				}),
			)
		else {
			if (isDefined(this.getMin) && ((x < this.getMin) as unknown as number)) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at least ${this.getMin}`,
						received: x,
					}),
				)
			}

			if (isDefined(this.getMax) && ((x > this.getMax) as unknown as number)) {
				issues.push(
					new s.ValidationIssue({
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
