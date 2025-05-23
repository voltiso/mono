// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
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

$fastAssert(OPTIONS)
$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownObjectImpl<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownObject'

	readonly [Voltiso.BASE_OPTIONS]: UnknownObjectOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownObjectOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomUnknownObjectImpl<
	O extends Partial<UnknownObjectOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownObject' as const

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	get getIndexSignatures(): [] {
		return [] as []
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	get getShape(): {} {
		return {}
	}

	//

	get plain(): never {
		return this._cloneWithOptions({
			isPlain: true,
		}) as never
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	index(...args: any): never {
		const r = new CustomObjectImpl({
			...defaultObjectOptions,
			...this[Voltiso.OPTIONS],
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
			...this[Voltiso.OPTIONS],
			shape,
			indexSignatures: [],
		}) as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isObjectSchema(other)) {
			return getKeys(other.getShape).length === 0
		} else if (isUnknownObjectSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
	}

	protected override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'object' || value === null) {
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'be object' },
					received: { value },
				}),
			)
		} else if (this[Voltiso.OPTIONS].isPlain && !isPlainObject(value)) {
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'be plain object' },
					received: { value },
				}),
			)
		}

		return issues
	}
}
