// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */

import { assumeType, lazyConstructor } from '@voltiso/util'
import * as VObject from '@voltiso/util'

import type { IRootSchema, ISchema } from '../../schema'
import { OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import type { InferableObject } from '../../schema/Schemable.js'
import * as s from '..'
import { deepPartialShape } from './_/deepPartialShape.js'
import type { ObjectOptions } from './_/ObjectOptions.js'
import { defaultObjectOptions } from './_/ObjectOptions.js'
import { partialShape } from './_/partialShape.js'
import type { CustomObject } from './CustomObject.js'
import { IS_OBJECT, isObject } from './IObject.js'
import { isUnknownObject } from './unknown'

export class Object__<O extends ObjectOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomObject<O>
{
	readonly [IS_OBJECT] = true as const

	get getShape(): O['shape'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['shape']
	}

	constructor(o: Omit<O, '_out' | '_in'>) {
		super(o as O)
	}

	get partial(): never {
		return this._cloneWithOptions({
			shape: partialShape(this.getShape),
		}) as never
	}

	get deepPartial(): never {
		return this._cloneWithOptions({
			shape: deepPartialShape(this.getShape),
		}) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isObject(other)) {
			for (const [k, v] of VObject.getEntries(other.getShape)) {
				const hasThisK = VObject.hasProperty(this.getShape, k)
				// eslint-disable-next-line security/detect-object-injection
				const isOtherOptional = s.schema(other.getShape[k]).isOptional

				if (!hasThisK && !isOtherOptional) return false
				// eslint-disable-next-line security/detect-object-injection
				else if (hasThisK && !s.schema(this.getShape[k]).extends(v))
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
	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (typeof x !== 'object' || x === null) {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be object (non-null)',
					received: x,
				}),
			)
		} else {
			for (const [k, v] of VObject.getEntries(this.getShape)) {
				const tv = s.schema(v)

				// eslint-disable-next-line no-continue
				if (tv.isOptional && !VObject.hasProperty(x, k)) continue

				assumeType<IRootSchema>(tv)

				const r = tv.tryValidate(x[k as keyof typeof x])

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [k, ...issue.path]

					issues = [...issues, ...r.issues]
				}
			}

			for (const k in x) {
				if (!VObject.hasProperty(this.getShape, k)) {
					issues.push(
						new s.ValidationIssue({
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

	override _fixImpl(x: unknown): unknown {
		if (typeof x !== 'undefined' && !VObject.isObject(x)) {
			return super._fixImpl(x)
		}

		const r = { ...x } as Record<keyof any, unknown>

		for (const [key, schemable] of VObject.getEntries(this.getShape)) {
			const schema = s.schema(schemable)

			if (
				!VObject.hasProperty(r, key) &&
				schema.isOptional &&
				!schema.hasDefault
			) {
				// assert(
				// 	typeof tv.getDefault === 'undefined',
				// 	"typeof tv.getDefault === 'undefined'"
				// )
				// eslint-disable-next-line no-continue
				continue
			}

			assumeType<IRootSchema>(schema)

			// eslint-disable-next-line security/detect-object-injection
			r[key] = schema.tryValidate(r[key]).value
		}

		return r
	}
}

export class Object_<I extends InferableObject> extends Object__<never> {
	constructor(shape: I) {
		super({ ...defaultObjectOptions, shape } as never)
	}
}
