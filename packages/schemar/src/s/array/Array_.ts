import { CALL, callableInstance, lazyConstructor } from '@voltiso/ts-util/class'
import { ISchema, RootSchemable, OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols'
import { isTuple, isUnknownTuple } from '../tuple'
import {
	ArrayOptions,
	defaultMutableArrayOptions,
	defaultReadonlyArrayOptions,
} from './_/ArrayOptions'
import { isArray, IS_ARRAY } from './IArray'
import { CustomArray } from './CustomArray'
import * as s from '..'

export class Array_<O extends ArrayOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomArray<O>
{
	readonly [IS_ARRAY] = true as const

	get getMinLength(): O['minLength'] {
		return this[OPTIONS].minLength
	}

	get getMaxLength(): O['maxLength'] {
		return this[OPTIONS].maxLength
	}

	get isReadonlyArray(): O['readonlyArray'] {
		return this[OPTIONS].readonlyArray
	}

	get getElementSchema(): O['element'] {
		return this[OPTIONS].element
	}

	constructor(o: O) {
		super(o)
		return callableInstance(this) as never
	}

	[CALL]<S extends RootSchemable>(elementType: S): never {
		return this._cloneWithOptions({ element: s.schema(elementType) }) as never
	}

	get readonlyArray(): never {
		return this._cloneWithOptions({ readonlyArray: true }) as never
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
				const thisMinLength =
					typeof this.getMinLength === 'undefined'
						? -Infinity
						: this.getMinLength

				const thisMaxLength =
					typeof this.getMaxLength === 'undefined'
						? Infinity
						: this.getMaxLength

				if (thisMinLength > other.getLength) return false
				if (thisMaxLength < other.getLength) return false

				for (const t of other.getElementSchemas) {
					if (!this.getElementSchema.extends(t)) return false
				}

				return true
			} else if (isUnknownTuple(other)) {
				const thisMinLength =
					typeof this.getMinLength === 'undefined'
						? -Infinity
						: this.getMinLength

				const thisMaxLength =
					typeof this.getMaxLength === 'undefined'
						? Infinity
						: this.getMaxLength

				const otherMinLength =
					typeof other.getMinLength === 'undefined'
						? -Infinity
						: other.getMinLength

				const otherMaxLength =
					typeof other.getMaxLength === 'undefined'
						? -Infinity
						: other.getMaxLength

				return (
					thisMinLength <= otherMinLength && otherMaxLength <= thisMaxLength
				)
			}
		}

		if (isArray(other))
			return this.getElementSchema.extends(other.getElementSchema)
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (!Array.isArray(x)) {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be array',
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

			for (const [idx, e] of x.entries()) {
				const c = this.getElementSchema.tryValidate(e)
				if (!c.isValid) {
					for (const issue of c.issues) issue.path = [idx, ...issue.path]
					issues = [...issues, ...c.issues]
				}
			}
		}

		return issues
	}

	override _toString(): string {
		const elementTypeStr = this.getElementSchema.toString()
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
		maxLength: Max
	): never {
		return this._cloneWithOptions({ minLength, maxLength }) as never
	}
}

//

export class ReadonlyArray_<
	Element extends RootSchemable
> extends Array_<never> {
	constructor(element: Element) {
		super({
			...defaultReadonlyArrayOptions,
			element: s.schema(element),
		} as never)
	}
}

export class MutableArray_<
	Element extends RootSchemable
> extends Array_<never> {
	constructor(element: Element) {
		super({
			...defaultMutableArrayOptions,
			element: s.schema(element),
		} as never)
	}
}
