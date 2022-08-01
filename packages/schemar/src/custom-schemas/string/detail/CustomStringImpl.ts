// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type BASE_OPTIONS,
	type DEFAULT_OPTIONS,
	EXTENDS,
	OPTIONS,
	SCHEMA_NAME,
} from '_'
import {
	CALL,
	callableInstance,
	isDefined,
	lazyConstructor,
} from '@voltiso/util'

import type {
	CustomString,
	DefaultStringOptions,
	ISchema,
	Literal,
	RegExpEntry,
	StringOptions,
} from '~'
import { CustomSchemaImpl, isString, literal, ValidationIssue } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomStringImpl<O> {
	// declare readonly [PARTIAL_OPTIONS]: O;

	// declare readonly [OPTIONS]: Assume<
	// 	StringOptions,
	// 	MergeSchemaOptions<DefaultStringOptions, O>
	// >

	readonly [BASE_OPTIONS]: StringOptions
	readonly [DEFAULT_OPTIONS]: DefaultStringOptions
}

export class CustomStringImpl<O extends Partial<StringOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomString<O>
{
	readonly [SCHEMA_NAME] = 'String' as const

	get getMinLength(): this[OPTIONS]['minLength'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].minLength as never
	}

	get getMaxLength(): this[OPTIONS]['maxLength'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].maxLength as never
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
	[CALL]<L extends string>(...args: readonly L[] | [Set<L>]): Literal<L> {
		return literal(...(args as never[])) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isString(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x === 'string') {
			if (isDefined(this.getMinLength) && x.length < this.getMinLength) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `be of length at least ${this.getMinLength}`,
						received: x.length,
					}),
				)
			}

			if (isDefined(this.getMaxLength) && x.length > this.getMaxLength) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						expectedDescription: `be of length at most ${this.getMaxLength}`,
						received: x.length,
					}),
				)
			}

			for (const re of this.getRegExps) {
				if (!re.regExp.test(x)) {
					issues.push(
						new ValidationIssue({
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
				new ValidationIssue({
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

	length<ExactLength extends number>(exactLength: ExactLength): never {
		return this._cloneWithOptions({
			minLength: exactLength,
			maxLength: exactLength,
		}) as never
	}

	lengthRange<Min extends number, Max extends number>(
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
