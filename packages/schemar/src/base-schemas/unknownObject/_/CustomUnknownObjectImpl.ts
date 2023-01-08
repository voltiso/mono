// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import {
	BoundCallable,
	CALL,
	getKeys,
	isPlainObject,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import type {
	DefaultUnknownObjectOptions,
	InferableObject,
	ISchema,
	Object as ObjectSchema,
	UnknownObjectOptions,
} from '~'
import { CustomSchemaImpl, isObjectSchema, isUnknownObjectSchema } from '~'
import { CustomObjectImpl, defaultObjectOptions } from '~/base-schemas/object'
import { ValidationIssue } from '~/meta-schemas'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownObjectImpl<O> {
	readonly [SCHEMA_NAME]: 'UnknownObject'

	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions
	readonly [BASE_OPTIONS]: UnknownObjectOptions
}

export class CustomUnknownObjectImpl<
	O extends Partial<UnknownObjectOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	readonly [SCHEMA_NAME] = 'UnknownObject' as const

	// declare readonly [PARTIAL_OPTIONS]: O;

	// declare readonly [OPTIONS]: Assume<
	// 	UnknownObjectOptions,
	// 	MergeSchemaOptions<DefaultUnknownObjectOptions, O>
	// >

	// eslint-disable-next-line class-methods-use-this
	get getIndexSignatures() {
		return [] as []
	}

	// eslint-disable-next-line class-methods-use-this
	get getShape() {
		return {}
	}

	//

	get plain(): never {
		return this._cloneWithOptions({
			isPlain: true,
		}) as never
	}

	index(...args: any) {
		const r = new CustomObjectImpl({
			...defaultObjectOptions,
			// eslint-disable-next-line security/detect-object-injection
			...this[OPTIONS],
		})

		return r.index(...(args as never))
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	[CALL]<S extends InferableObject>(shape: S): ObjectSchema<S> {
		// console.log('CustomUnknownObjectImpl[CALL]', this)
		return new CustomObjectImpl({
			...defaultObjectOptions,
			// eslint-disable-next-line security/detect-object-injection
			...this[OPTIONS],
			shape,
		}) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isObjectSchema(other)) {
			return getKeys(other.getShape).length === 0
		} else if (isUnknownObjectSchema(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	protected override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'object' || value === null) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { description: 'be object' },
					received: { value },
				}),
			)
			// eslint-disable-next-line security/detect-object-injection
		} else if (this[OPTIONS].isPlain && !isPlainObject(value)) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { description: 'be plain object' },
					received: { value },
				}),
			)
		}

		return issues
	}
}
