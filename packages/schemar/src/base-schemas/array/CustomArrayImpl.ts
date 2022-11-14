// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schemable,
	ArrayOptions,
	CustomArray,
	DefaultArrayOptions,
	ISchema,
	Schema,
	ValidateOptions,
} from '@voltiso/schemar.types'
import {
	EXTENDS,
	isArray,
	isTuple,
	isUnknownTuple,
	SCHEMA_NAME,
} from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import {
	BoundCallable,
	CALL,
	isDefined,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import { schema } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomArrayImpl<O> {
	readonly [BASE_OPTIONS]: ArrayOptions
	readonly [DEFAULT_OPTIONS]: DefaultArrayOptions
}

export class CustomArrayImpl<O extends Partial<ArrayOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomArray<O>
{
	readonly [SCHEMA_NAME] = 'Array' as const

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

	get getElementSchema(): this[OPTIONS]['element'] {
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
		if (isArray(other) && this.isReadonlyArray && !other.isReadonlyArray)
			return false

		if (
			(isTuple(other) || isUnknownTuple(other)) &&
			this.isReadonlyArray &&
			!other.isReadonlyTuple
		)
			return false

		// readonly arrays can extend readonly tuples

		if (this.isReadonlyArray) {
			if (isTuple(other)) {
				const thisMinLength = this.getMinLength ?? -Infinity
				const thisMaxLength = this.getMaxLength ?? +Infinity

				if (thisMinLength > other.getLength) return false
				if (thisMaxLength < other.getLength) return false

				for (const t of other.getShape) {
					if (!(this.getElementSchema as unknown as ISchema).extends(t))
						return false
				}

				return true
			} else if (isUnknownTuple(other)) {
				const thisMinLength = this.getMinLength ?? -Infinity
				const thisMaxLength = this.getMaxLength ?? +Infinity

				const otherMinLength = other.getMinLength ?? -Infinity
				const otherMaxLength = other.getMaxLength ?? +Infinity

				return (
					thisMinLength <= otherMinLength && otherMaxLength <= thisMaxLength
				)
			}
		}

		if (isArray(other))
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
			// eslint-disable-next-line no-param-reassign
			x = x.map(element =>
				(schema(this.getElementSchema) as unknown as Schema).tryValidate(
					element,
					options,
				),
			)
		}

		return x
	}

	override _getIssues(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): ValidationIssue[] {
		let issues = []

		if (!Array.isArray(x)) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expectedDescription: 'be array',
					received: x,
				}),
			)
		} else {
			if (isDefined(this.getMinLength) && x.length < this.getMinLength) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line security/detect-object-injection
						name: this[OPTIONS].name,

						expectedDescription: `be of length at least ${
							this.getMinLength as number
						}`,

						received: x.length,
					}),
				)
			}

			if (isDefined(this.getMaxLength) && x.length > this.getMaxLength) {
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line security/detect-object-injection
						name: this[OPTIONS].name,

						expectedDescription: `be of length at most ${
							this.getMaxLength as number
						}`,

						received: x.length,
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
