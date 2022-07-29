// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable complexity */
/* eslint-disable sonarjs/cognitive-complexity */
// eslint-disable complexity

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { ISchema, RootSchemable } from '../../Schema/index'
import { SCHEMA_OPTIONS, CustomSchemaImpl } from '../../Schema/index'
import { EXTENDS } from '../../Schema/detail/symbols.js'
import * as s from '../index'
import { isTuple, isUnknownTuple } from '../tuple/index'
import type { ArrayOptions } from './_/ArrayOptions.js'
import {
	defaultMutableArrayOptions,
	defaultReadonlyArrayOptions,
} from './_/ArrayOptions.js'
import type { CustomArray } from './CustomArray.js'
import { IS_ARRAY, isArray } from './IArray.js'

export class Array_<O extends ArrayOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomArray<O>
{
	readonly [IS_ARRAY] = true as const

	get getMinLength(): O['minLength'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[SCHEMA_OPTIONS].minLength
	}

	get getMaxLength(): O['maxLength'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[SCHEMA_OPTIONS].maxLength
	}

	get isReadonlyArray(): O['readonlyArray'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[SCHEMA_OPTIONS].readonlyArray
	}

	get getElementSchema(): O['element'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[SCHEMA_OPTIONS].element
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
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
						? Number.NEGATIVE_INFINITY
						: this.getMinLength

				const thisMaxLength =
					typeof this.getMaxLength === 'undefined'
						? Number.POSITIVE_INFINITY
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
			return this.getElementSchema.extends(other.getElementSchema)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (!Array.isArray(x)) {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be array',
					received: x,
				}),
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
					}),
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
					}),
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
		maxLength: Max,
	): never {
		return this._cloneWithOptions({ minLength, maxLength }) as never
	}
}

//

export class ReadonlyArray_<
	Element extends RootSchemable,
> extends Array_<never> {
	constructor(element: Element) {
		super({
			...defaultReadonlyArrayOptions,
			element: s.schema(element),
		} as never)
	}
}

export class MutableArray_<
	Element extends RootSchemable,
> extends Array_<never> {
	constructor(element: Element) {
		super({
			...defaultMutableArrayOptions,
			element: s.schema(element),
		} as never)
	}
}
