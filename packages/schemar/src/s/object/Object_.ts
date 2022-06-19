import { lazyConstructor } from '@voltiso/ts-util/class'
import { InferableObject } from '../../schema/Schemable'
import { IRootSchema, ISchema, OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols'
import { assumeType } from '@voltiso/ts-util'
import { defaultObjectOptions, ObjectOptions } from './_/ObjectOptions'
import { partialShape } from './_/partialShape'
import { deepPartialShape } from './_/deepPartialShape'
import { isObject, IS_OBJECT } from './IObject'
import { isUnknownObject } from './unknown'
import { CustomObject } from './CustomObject'
import * as VObject from '@voltiso/ts-util/object'
import * as s from '..'

export class Object__<O extends ObjectOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomObject<O>
{
	readonly [IS_OBJECT] = true as const

	get getShape(): O['shape'] {
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
				const isOtherOptional = s.schema(other.getShape[k]).isOptional
				if (!hasThisK && !isOtherOptional) return false
				else if (hasThisK && !s.schema(this.getShape[k]).extends(v))
					return false
			}
			return true
		} else if (isUnknownObject(other)) {
			return true
		} else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (typeof x !== 'object' || x === null) {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be object (non-null)',
					received: x,
				})
			)
		} else {
			for (const [k, v] of VObject.getEntries(this.getShape)) {
				const tv = s.schema(v)
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
							received: x[k],
						})
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

		const r = { ...x } as Record<string, unknown>

		for (const [key, schemable] of VObject.getEntries(this.getShape)) {
			const schema = s.schema(schemable)

			if (
				!VObject.hasProperty(r, key) &&
				schema.isOptional &&
				typeof schema.getDefault === 'undefined'
			) {
				// assert(
				// 	typeof tv.getDefault === 'undefined',
				// 	"typeof tv.getDefault === 'undefined'"
				// )
				continue
			}

			assumeType<IRootSchema>(schema)

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
