import { CALL, callableInstance, lazyConstructor } from '@voltiso/ts-util/class'
import {
	BigintOptions,
	DefaultBigintOptions,
	defaultBigintOptions,
} from './_/BigintOptions'
import { IRootSchema, OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols'
import * as s from '..'
import { CustomBigint } from './CustomBigint'
import { isBigint, IS_BIGINT } from './IBigint'

class Bigint__<O extends BigintOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomBigint<O>
{
	readonly [IS_BIGINT] = true as const

	get getMin(): this[OPTIONS]['min'] {
		return this[OPTIONS]['min']
	}

	get getMax(): this[OPTIONS]['max'] {
		return this[OPTIONS]['max']
	}

	constructor(o: O) {
		super(o)
		return callableInstance(this) as never
	}

	[CALL]<L extends bigint>(...literals: L[]): s.Literal<L>
	[CALL]<L extends bigint>(literals: Set<L>): s.Literal<L>
	[CALL]<L extends bigint>(...args: L[] | [Set<L>]): s.Literal<L>

	[CALL]<L extends bigint>(...args: L[] | [Set<L>]): s.Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return s.literal(literals)
	}

	override [EXTENDS](other: IRootSchema): boolean {
		if (isBigint(other)) return true
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'bigint')
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'bigint',
					received: x,
				})
			)
		else {
			if (typeof this.getMin !== 'undefined' && x < this.getMin) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at least ${this.getMin}`,
						received: x,
					})
				)
			}

			if (typeof this.getMax !== 'undefined' && x > this.getMax) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at most ${this.getMax}`,
						received: x,
					})
				)
			}
		}

		return issues
	}

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
		max: MaxValue
	): never {
		return this._cloneWithOptions({ min, max }) as never
	}
}

//

export class Bigint_ extends Bigint__<DefaultBigintOptions> {
	constructor() {
		super(defaultBigintOptions as never)
	}
}
