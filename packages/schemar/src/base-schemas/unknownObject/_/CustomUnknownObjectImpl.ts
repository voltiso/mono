// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/complexity/noBannedTypes: . */
/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import {
	$fastAssert,
	BoundCallable,
	CALL,
	getKeys,
	isPlainObject,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

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
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomUnknownObjectImpl<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownObject'

	readonly [Voltiso.BASE_OPTIONS]: UnknownObjectOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownObjectOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomUnknownObjectImpl<
	O extends Partial<UnknownObjectOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownObject' as const

	get getIndexSignatures(): [] {
		return [] as []
	}

	get getShape(): {} {
		return {}
	}

	//

	get plain(): never {
		return this._cloneWithOptions({
			isPlain: true,
		}) as never
	}

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

		// biome-ignore lint/correctness/noConstructorReturn: hacky hacky
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
