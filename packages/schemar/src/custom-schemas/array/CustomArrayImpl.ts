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
	ArrayOptions,
	CustomArray,
	DefaultArrayOptions,
	ISchema,
	Schemable,
} from '~'
import {
	CustomSchemaImpl,
	isArray,
	isTuple,
	isUnknownTuple,
	schema,
	ValidationIssue,
} from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomArrayImpl<O> {
	readonly [BASE_OPTIONS]: ArrayOptions
	readonly [DEFAULT_OPTIONS]: DefaultArrayOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	ArrayOptions,
	// 	MergeSchemaOptions<DefaultArrayOptions, O>
	// >
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
		return callableInstance(this) as never
	}

	[CALL]<S extends Schemable>(elementType: S): never {
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
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (isArray(other) && this.isReadonlyArray && !other.isReadonlyArray)
			return false

		if (
			(isTuple(other) || isUnknownTuple(other)) &&
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			this.isReadonlyArray &&
			!other.isReadonlyTuple
		)
			return false

		// readonly arrays can extend readonly tuples

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (this.isReadonlyArray) {
			if (isTuple(other)) {
				const thisMinLength =
					typeof this.getMinLength === 'undefined'
						? Number.NEGATIVE_INFINITY
						: this.getMinLength

				const thisMaxLength =
					typeof this.getMaxLength === 'undefined'
						? Number.POSITIVE_INFINITY
						: this.getMaxLength

				if (thisMinLength > other.getLength) return false

				if (thisMaxLength < other.getLength) return false

				for (const t of other.getShape) {
					if (!(this.getElementSchema as unknown as ISchema).extends(t))
						return false
				}

				return true
			} else if (isUnknownTuple(other)) {
				const thisMinLength =
					typeof this.getMinLength === 'undefined'
						? Number.NEGATIVE_INFINITY
						: this.getMinLength

				const thisMaxLength =
					typeof this.getMaxLength === 'undefined'
						? Number.POSITIVE_INFINITY
						: this.getMaxLength

				const otherMinLength =
					typeof other.getMinLength === 'undefined'
						? Number.NEGATIVE_INFINITY
						: other.getMinLength

				const otherMaxLength =
					typeof other.getMaxLength === 'undefined'
						? Number.NEGATIVE_INFINITY
						: other.getMaxLength

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

	protected override _fixImpl(x: unknown): unknown {
		// eslint-disable-next-line no-param-reassign
		x = super._fixImpl(x)

		if (Array.isArray(x)) {
			// eslint-disable-next-line no-param-reassign
			x = x.map(element =>
				(schema(this.getElementSchema) as ISchema).fix(element),
			)
		}

		// eslint-disable-next-line no-param-reassign
		x = super._fixImpl(x)

		return x
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (!Array.isArray(x)) {
			issues.push(
				new ValidationIssue({
					expectedDescription: 'be array',
					received: x,
				}),
			)
		} else {
			if (isDefined(this.getMinLength) && x.length < this.getMinLength) {
				issues.push(
					new ValidationIssue({
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
						expectedDescription: `be of length at most ${
							this.getMaxLength as number
						}`,

						received: x.length,
					}),
				)
			}

			for (const [idx, e] of x.entries()) {
				const c = (this.getElementSchema as unknown as ISchema).tryValidate(e)

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

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
