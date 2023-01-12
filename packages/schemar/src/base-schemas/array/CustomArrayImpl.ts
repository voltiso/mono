// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	BASE_OPTIONS,
	BoundCallable,
	CALL,
	DEFAULT_OPTIONS,
	isDefined,
	lazyConstructor,
	OPTIONS,
	zip,
} from '@voltiso/util'

import type {
	$$Schemable,
	ArrayOptions,
	CustomArray,
	ISchema,
	Schema,
	ValidateOptions,
} from '~'
import {
	CustomSchemaImpl,
	isArraySchema,
	isTupleSchema,
	isUnknownTupleSchema,
} from '~'
import { schema } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'

export class CustomArrayImpl<O extends Partial<ArrayOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomArray<O>
{
	readonly [SCHEMA_NAME] = 'Array' as const;

	declare readonly [BASE_OPTIONS]: ArrayOptions;
	declare readonly [DEFAULT_OPTIONS]: ArrayOptions.Default

	get getMinLength(): this[OPTIONS]['minLength'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].minLength as never
	}

	get getMaxLength(): this[OPTIONS]['maxLength'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].maxLength as never
	}

	get isReadonlyArray(): this[OPTIONS]['isReadonlyArray'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonlyArray as never
	}

	get getElementSchema(): CustomArray.GetElementSchema<this> {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].element as never
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	[CALL]<S extends $$Schemable>(elementType: S): never {
		return this._cloneWithOptions({
			element: schema(elementType) as never,
		}) as never
	}

	get readonlyArray(): never {
		return this._cloneWithOptions({ isReadonlyArray: true }) as never
	}

	get mutableArray(): never {
		return this._cloneWithOptions({ isReadonlyArray: false }) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isArraySchema(other) && this.isReadonlyArray && !other.isReadonlyArray)
			return false

		if (
			(isTupleSchema(other) || isUnknownTupleSchema(other)) &&
			this.isReadonlyArray &&
			!other.isReadonlyTuple
		)
			return false

		// readonly arrays can extend readonly tuples

		if (this.isReadonlyArray) {
			if (isTupleSchema(other)) {
				const thisMinLength = this.getMinLength ?? -Infinity
				const thisMaxLength = this.getMaxLength ?? +Infinity

				if (thisMinLength > other.getLength) return false
				if (thisMaxLength < other.getLength) return false

				for (const t of other.getShape) {
					if (!(this.getElementSchema as unknown as ISchema).extends(t))
						return false
				}

				return true
			} else if (isUnknownTupleSchema(other)) {
				const thisMinLength = this.getMinLength ?? -Infinity
				const thisMaxLength = this.getMaxLength ?? +Infinity

				const otherMinLength = other.getMinLength ?? -Infinity
				const otherMaxLength = other.getMaxLength ?? +Infinity

				return (
					thisMinLength <= otherMinLength && otherMaxLength <= thisMaxLength
				)
			}
		}

		if (isArraySchema(other))
			return (this.getElementSchema as unknown as ISchema).extends(
				other.getElementSchema,
			)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	protected override _fix(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): unknown {
		if (Array.isArray(x)) {
			const result = x.map(element =>
				(schema(this.getElementSchema) as unknown as Schema).tryValidate(
					element,
					options,
				),
			)

			let haveChange = false
			for (const [a, b] of zip(x, result)) if (a !== b) haveChange = true

			// eslint-disable-next-line no-param-reassign
			if (haveChange) x = result
		}

		return x
	}

	override _getIssues(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): ValidationIssue[] {
		let issues = []

		if (Array.isArray(x)) {
			if (isDefined(this.getMinLength) && x.length < this.getMinLength) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line security/detect-object-injection
						name: this[OPTIONS].name,

						expected: {
							description: `be of length at least ${
								this.getMinLength as number
							}`,
						},

						received: { value: x.length },
					}),
				)
			}

			if (isDefined(this.getMaxLength) && x.length > this.getMaxLength) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line security/detect-object-injection
						name: this[OPTIONS].name,

						expected: {
							description: `be of length at most ${
								this.getMaxLength as number
							}`,
						},

						received: { value: x.length },
					}),
				)
			}

			for (const [idx, e] of x.entries()) {
				const c = (this.getElementSchema as unknown as ISchema).exec(e, options)

				if (!c.isValid) {
					for (const issue of c.issues) issue.path = [idx, ...issue.path]

					issues = [...issues, ...c.issues]
				}
			}
		} else {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { description: 'be array' },
					received: { value: x },
				}),
			)
		}

		return issues
	}

	override _toString(): string {
		const elementTypeStr = (
			this.getElementSchema as unknown as ISchema
		).toString()

		if (this.isReadonlyArray) return `readonly ${elementTypeStr}[]`
		else return `${elementTypeStr}[]`
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
		maxLength: Max,
	): never {
		return this._cloneWithOptions({ minLength, maxLength }) as never
	}
}
