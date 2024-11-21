// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
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

import type { $$Schema, InferableObject, Schema, UnknownObjectOptions } from '~'
import {
	CustomSchemaImpl,
	isObjectSchema,
	isSchema,
	isUnknownObjectSchema,
} from '~'
import { CustomObjectImpl, defaultObjectOptions } from '~/base-schemas/object'
import { ValidationIssue } from '~/meta-schemas'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownObjectImpl<O> {
	readonly [SCHEMA_NAME]: 'UnknownObject'

	readonly [BASE_OPTIONS]: UnknownObjectOptions
	readonly [DEFAULT_OPTIONS]: UnknownObjectOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomUnknownObjectImpl<
	O extends Partial<UnknownObjectOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	override readonly [SCHEMA_NAME] = 'UnknownObject' as const

	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/class-methods-use-this
	get getIndexSignatures() {
		return [] as []
	}

	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/class-methods-use-this
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
			...this[OPTIONS],
		})

		return r.index(...(args as never))
	}

	constructor(o: O) {
		super(o)
		const newThis = BoundCallable(this)
		Object.freeze(newThis)
		// eslint-disable-next-line no-constructor-return
		return newThis
	}

	[CALL]<S extends InferableObject | $$Schema>(shape: S): any {
		if (isSchema(shape)) return shape

		// console.log('CustomUnknownObjectImpl[CALL]', this)
		return new CustomObjectImpl({
			...defaultObjectOptions,
			...this[OPTIONS],
			shape,
			indexSignatures: [],
		}) as never
	}

	override [EXTENDS](other: Schema): boolean {
		if (isObjectSchema(other)) {
			return getKeys(other.getShape).length === 0
		} else if (isUnknownObjectSchema(other)) return true
		else return super[EXTENDS](other)
	}

	protected override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'object' || value === null) {
			issues.push(
				new ValidationIssue({
					name: this[OPTIONS].name,
					expected: { description: 'be object' },
					received: { value },
				}),
			)
		} else if (this[OPTIONS].isPlain && !isPlainObject(value)) {
			issues.push(
				new ValidationIssue({
					name: this[OPTIONS].name,
					expected: { description: 'be plain object' },
					received: { value },
				}),
			)
		}

		return issues
	}
}
