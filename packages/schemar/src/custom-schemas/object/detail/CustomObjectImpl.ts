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
	getEntries,
	hasProperty,
	isObject,
	lazyConstructor,
} from '@voltiso/util'

import type {
	CustomObject,
	DefaultObjectOptions,
	ISchema,
	ObjectOptions,
	Schemable,
} from '~'
import {
	CustomSchemaImpl,
	deepPartialShape,
	isObject as sIsObject,
	isUnknownObject,
	partialShape,
	schema,
	ValidationIssue,
} from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomObjectImpl<O> {
	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions
}

export class CustomObjectImpl<O extends Partial<ObjectOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomObject<O>
{
	readonly [SCHEMA_NAME] = 'Object' as const

	get getShape(): this[OPTIONS]['shape'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['shape'] as never
	}

	get partial(): never {
		return this._cloneWithOptions({
			shape: partialShape(this.getShape as never) as unknown as never,
		}) as never
	}

	get deepPartial(): never {
		return this._cloneWithOptions({
			shape: deepPartialShape(this.getShape as never) as unknown as never,
		}) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (sIsObject(other)) {
			for (const [k, v] of getEntries(other.getShape)) {
				const hasThisK = hasProperty(this.getShape, k)
				// eslint-disable-next-line security/detect-object-injection
				const isOtherOptional = schema(other.getShape[k]).isOptional

				if (!hasThisK && !isOtherOptional) return false
				// eslint-disable-next-line security/detect-object-injection
				else if (hasThisK && !schema(this.getShape[k]).extends(v))
					// eslint-disable-next-line sonarjs/no-duplicated-branches
					return false
			}

			return true
		} else if (isUnknownObject(other)) {
			return true
			// eslint-disable-next-line security/detect-object-injection
		} else return super[EXTENDS](other)
	}

	// eslint-disable-next-line sonarjs/cognitive-complexity
	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (typeof x !== 'object' || x === null) {
			issues.push(
				new ValidationIssue({
					expectedDescription: 'be object (non-null)',
					received: x,
				}),
			)
		} else {
			for (const [k, v] of getEntries(this.getShape) as [
				keyof any,
				Schemable,
			][]) {
				const tv = schema(v)

				if (tv.isOptional && !hasProperty(x, k)) continue

				// assumeType<ISchema>(tv)

				const r = tv.tryValidate(x[k as keyof typeof x])

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [k, ...issue.path]

					issues = [...issues, ...r.issues]
				}
			}

			for (const k in x) {
				if (!hasProperty(this.getShape, k)) {
					issues.push(
						new ValidationIssue({
							path: [k],
							expectedDescription: 'not be present',
							// eslint-disable-next-line security/detect-object-injection
							received: x[k],
						}),
					)
				}
			}
		}

		return issues
	}

	override _fixImpl(x: this[OPTIONS]['Input']): this[OPTIONS]['Output'] {
		if (typeof x !== 'undefined' && !isObject(x)) {
			return super._fixImpl(x)
		}

		const r = { ...x } as Record<keyof any, unknown>

		for (const [key, schemable] of getEntries(this.getShape) as [
			keyof any,
			Schemable,
		][]) {
			const mySchema = schema(schemable)

			if (!hasProperty(r, key) && mySchema.isOptional && !mySchema.hasDefault) {
				// assert(
				// 	typeof tv.getDefault === 'undefined',
				// 	"typeof tv.getDefault === 'undefined'"
				// )
				continue
			}

			// assumeType<ISchema>(mySchema)

			// eslint-disable-next-line security/detect-object-injection
			r[key] = mySchema.tryValidate(r[key]).value
		}

		return r as never
	}
}
