// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	DefaultUnknownObjectOptions,
	InferableObject,
	ISchema,
	UnknownObjectOptions,
} from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import {
	BoundCallable,
	CALL,
	getKeys,
	isPlainObject,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import * as s from '~/base-schemas/object'
import { defaultObjectOptions } from '~/base-schemas/object'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownObjectImpl<O> {
	readonly [t.SCHEMA_NAME]: 'UnknownObject'

	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions
	readonly [BASE_OPTIONS]: UnknownObjectOptions
}

export class CustomUnknownObjectImpl<
	O extends Partial<UnknownObjectOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	readonly [t.SCHEMA_NAME] = 'UnknownObject' as const

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
		const r = new s.CustomObjectImpl({
			...s.defaultObjectOptions,
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

	[CALL]<S extends InferableObject>(shape: S): t.Object<S> {
		// console.log('CustomUnknownObjectImpl[CALL]', this)
		return new s.CustomObjectImpl({
			...defaultObjectOptions,
			// eslint-disable-next-line security/detect-object-injection
			...this[OPTIONS],
			shape,
		}) as never
	}

	override [t.EXTENDS](other: ISchema): boolean {
		if (t.isObject(other)) {
			return getKeys(other.getShape).length === 0
		} else if (t.isUnknownObject(other)) return true
		else return super[t.EXTENDS](other)
	}

	protected override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'object' || x === null) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expectedDescription: 'be object',
					received: x,
				}),
			)
			// eslint-disable-next-line security/detect-object-injection
		} else if (this[OPTIONS].isPlain && !isPlainObject(x)) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expectedDescription: 'be plain object',
					received: x,
				}),
			)
		}

		return issues
	}
}
