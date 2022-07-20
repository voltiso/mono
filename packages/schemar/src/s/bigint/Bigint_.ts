// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { IRootSchema } from '../../schema'
import { OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import * as s from '..'
import type { BigintOptions, DefaultBigintOptions } from './_/BigintOptions.js'
import { defaultBigintOptions } from './_/BigintOptions.js'
import type { CustomBigint } from './CustomBigint.js'
import { IS_BIGINT, isBigint } from './IBigint.js'

class Bigint__<O extends BigintOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomBigint<O>
{
	readonly [IS_BIGINT] = true as const

	get getMin(): this[OPTIONS]['min'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['min']
	}

	get getMax(): this[OPTIONS]['max'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['max']
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

	override [EXTENDS](other: IRootSchema): boolean {
		if (isBigint(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'bigint')
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'bigint',
					received: x,
				}),
			)
		else {
			if (typeof this.getMin !== 'undefined' && x < this.getMin) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `at least ${this.getMin}`,
						received: x,
					}),
				)
			}

			if (typeof this.getMax !== 'undefined' && x > this.getMax) {
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

//

export class Bigint_ extends Bigint__<DefaultBigintOptions> {
	constructor() {
		super(defaultBigintOptions as never)
	}
}
