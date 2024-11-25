// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
	BASE_OPTIONS,
	BoundCallable,
	CALL,
	DEFAULT_OPTIONS,
	isDefined,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import type { Literal } from '~/core-schemas/literal/Literal'
import { literal } from '~/core-schemas/unknownLiteral/UnknownLiteral'
import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'

import type { CustomString } from '../CustomString'
import { isStringSchema } from '../IString'
import type { RegExpEntry } from '../RegExpEntry'
import type { StringOptions } from '../StringOptions'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

export class CustomStringImpl<O extends Partial<StringOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomString<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [SCHEMA_NAME] = 'String' as const

	declare readonly [BASE_OPTIONS]: StringOptions
	declare readonly [DEFAULT_OPTIONS]: StringOptions.Default

	get getMinLength(): this[OPTIONS]['minLength'] {
		return this[OPTIONS].minLength as never
	}

	get getMaxLength(): this[OPTIONS]['maxLength'] {
		return this[OPTIONS].maxLength as never
	}

	get getRegExps(): this[OPTIONS]['regExps'] {
		return this[OPTIONS].regExps as never
	}

	constructor(o: O) {
		super(o)
		const newThis = BoundCallable(this)
		Object.freeze(newThis)
		// eslint-disable-next-line no-constructor-return
		return newThis
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	[CALL]<L extends string>(...args: readonly L[] | [Set<L>]): Literal<L> {
		return literal(...(args as never[])) as never
	}

	override [EXTENDS](other: Schema): boolean {
		if (isStringSchema(other)) return true
		else return super[EXTENDS](other)
	}

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof x === 'string') {
			if (isDefined(this.getMinLength) && x.length < this.getMinLength) {
				issues.push(
					new ValidationIssue({
						name: this[OPTIONS].name,

						expected: {
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							description: `be of length at least ${this.getMinLength}`,
						},

						received: { value: x.length },
					}),
				)
			}

			if (isDefined(this.getMaxLength) && x.length > this.getMaxLength) {
				issues.push(
					new ValidationIssue({
						name: this[OPTIONS].name,

						expected: {
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							description: `be of length at most ${this.getMaxLength}`,
						},

						received: { value: x.length },
					}),
				)
			}

			for (const re of this.getRegExps as RegExpEntry[]) {
				if (!re.regExp.test(x)) {
					issues.push(
						new ValidationIssue({
							name: this[OPTIONS].name,

							expected: {
								description:
									re.expectedDescription ??
									`pass RegExp(${re.regExp.toString()})`,
							},

							received: { value: x },
						}),
					)
				}
			}
		} else {
			issues.push(
				new ValidationIssue({
					name: this[OPTIONS].name,
					expected: { description: 'be string' },
					received: { value: x },
				}),
			)
		}

		return issues
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
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
		if (maxLength === undefined) {
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
