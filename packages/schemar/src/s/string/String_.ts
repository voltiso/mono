/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CALL, callableInstance, lazyConstructor } from '@voltiso/ts-util/class'
import { ISchema, OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols'
import { RegExpEntry } from './_/RegExpEntry'
import {
	DefaultStringOptions,
	defaultStringOptions,
	StringOptions,
} from './_/StringOptions'
import { CustomString } from './CustomString'
import { isString, IS_STRING } from './IString'
import * as s from '..'

//

class SString__<O extends StringOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomString<O>
{
	readonly [IS_STRING] = true as const

	get getMinLength() {
		return this[OPTIONS].minLength
	}

	get getMaxLength() {
		return this[OPTIONS].maxLength
	}

	get getRegExps() {
		return this[OPTIONS].regExps
	}

	constructor(o: O) {
		super(o)
		return callableInstance(this) as never
	}

	[CALL]<L extends string>(...args: readonly L[] | [Set<L>]): s.Literal<L> {
		return s.literal(...args)
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isString(other)) return true
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)
		if (typeof x !== 'string') {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be string',
					received: x,
				})
			)
		} else {
			if (
				typeof this.getMinLength !== 'undefined' &&
				x.length < this.getMinLength
			) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `be of length at least ${this.getMinLength}`,
						received: x.length,
					})
				)
			}

			if (
				typeof this.getMaxLength !== 'undefined' &&
				x.length > this.getMaxLength
			) {
				issues.push(
					new s.ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `be of length at most ${this.getMaxLength}`,
						received: x.length,
					})
				)
			}

			for (const re of this.getRegExps) {
				if (!re.regExp.test(x)) {
					issues.push(
						new s.ValidationIssue({
							expectedDescription:
								re.expectedDescription ||
								`pass RegExp(${re.regExp.toString()})`,
							received: x,
						})
					)
				}
			}
		}
		return issues
	}

	override _toString(): string {
		return 'string'
	}

	minLength<Min extends number>(minLength: Min): never {
		return this._cloneWithOptions({ minLength }) as never
	}

	maxLength<Max extends number>(maxLength: Max): never {
		return this._cloneWithOptions({ maxLength }) as never
	}

	length<Min extends number, Max extends number>(
		minLength: Min,
		maxLength?: Max
	): never {
		if (typeof maxLength === 'undefined')
			maxLength = minLength as unknown as Max
		return this._cloneWithOptions({ minLength, maxLength }) as never
	}

	regex<R extends RegExp>(regExp: R, expectedDescription?: string): never {
		const entry: RegExpEntry =
			typeof expectedDescription !== 'undefined'
				? {
						regExp,
						expectedDescription,
				  }
				: { regExp }

		const regExps = [...this.getRegExps, entry]
		return this._cloneWithOptions({ regExps }) as never
	}
}

//

export class String_ extends SString__<DefaultStringOptions> {
	constructor() {
		super(defaultStringOptions)
	}
}
