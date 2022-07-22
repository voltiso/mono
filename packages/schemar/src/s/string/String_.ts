// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	CALL,
	callableInstance,
	isDefined,
	lazyConstructor,
} from '@voltiso/util'

import type { ISchema } from '../../schema'
import { OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import * as s from '..'
import type { RegExpEntry } from './_/RegExpEntry.js'
import type { DefaultStringOptions, StringOptions } from './_/StringOptions.js'
import { defaultStringOptions } from './_/StringOptions.js'
import type { CustomString } from './CustomString.js'
import { IS_STRING, isString } from './IString.js'

//

class SString__<O extends StringOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomString<O>
{
	readonly [IS_STRING] = true as const

	get getMinLength() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].minLength
	}

	get getMaxLength() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].maxLength
	}

	get getRegExps() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].regExps
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends string>(...args: readonly L[] | [Set<L>]): s.Literal<L> {
		return s.literal(...args)
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isString(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x === 'string') {
			if (
				typeof this.getMinLength !== 'undefined' &&
				x.length < this.getMinLength
			) {
				issues.push(
					new s.ValidationIssue({
						expectedDescription: `be of length at least ${this.getMinLength}`,
						received: x.length,
					}),
				)
			}

			if (
				typeof this.getMaxLength !== 'undefined' &&
				x.length > this.getMaxLength
			) {
				issues.push(
					new s.ValidationIssue({
						expectedDescription: `be of length at most ${this.getMaxLength}`,
						received: x.length,
					}),
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
						}),
					)
				}
			}
		} else {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be string',
					received: x,
				}),
			)
		}

		return issues
	}

	// eslint-disable-next-line class-methods-use-this
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
		maxLength?: Max,
	): never {
		if (typeof maxLength === 'undefined') {
			// eslint-disable-next-line no-param-reassign
			maxLength = minLength as unknown as Max
		}

		return this._cloneWithOptions({ minLength, maxLength }) as never
	}

	regex<R extends RegExp>(regExp: R, expectedDescription?: string): never {
		const entry: RegExpEntry = isDefined(expectedDescription)
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
