// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_GetArrayLength_,
	DefaultTupleOptions,
	GetDeepShape_,
	SchemaLike,
	TupleOptions,
	ValidateOptions,
} from '@voltiso/schemar.types'
import {
	EXTENDS,
	getDeepShape,
	isArray,
	isTuple,
	isUnknownTuple,
	SCHEMA_NAME,
} from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { lazyConstructor, OPTIONS } from '@voltiso/util'

import { schema } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

import { _tupleExtends, _tupleExtendsArray } from './_'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomTupleImpl<O> {
	readonly [BASE_OPTIONS]: TupleOptions
	readonly [DEFAULT_OPTIONS]: DefaultTupleOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	TupleOptions,
	// 	MergeSchemaOptions<DefaultTupleOptions, O>
	// >
}

export class CustomTupleImpl<
	O extends Partial<TupleOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	readonly [SCHEMA_NAME] = 'Tuple' as const

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonlyTuple as never
	}

	// eslint-disable-next-line etc/no-internal
	get getLength(): _GetArrayLength_<this[OPTIONS]['shape']> {
		return this.getShape.length as never
	}

	get getShape(): this[OPTIONS]['shape'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].shape as never
	}

	get getDeepShape(): GetDeepShape_<this> {
		return getDeepShape(this)
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	get readonlyTuple(): never {
		return this._cloneWithOptions({ isReadonlyTuple: true }) as never
	}

	get mutableTuple(): never {
		return this._cloneWithOptions({ isReadonlyTuple: false }) as never
	}

	override [EXTENDS](other: SchemaLike): boolean {
		if (
			(isTuple(other) || isUnknownTuple(other)) &&
			this.isReadonlyTuple &&
			!other.isReadonlyTuple
		)
			return false

		if (isArray(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		// eslint-disable-next-line etc/no-internal
		if (isTuple(other)) return _tupleExtends(this, other)
		else if (isUnknownTuple(other)) return true
		// eslint-disable-next-line etc/no-internal
		else if (isArray(other)) return _tupleExtendsArray(this, other)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	protected override _fix(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): unknown {
		if (Array.isArray(x) && x.length === this.getShape.length) {
			// eslint-disable-next-line no-param-reassign
			x = x.map((element, idx) =>
				// eslint-disable-next-line security/detect-object-injection
				schema(this.getShape[idx]).tryValidate(element, options),
			)
		}

		return x
	}

	override _getIssues(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): ValidationIssue[] {
		let issues = []

		if (!Array.isArray(x)) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name
						? // eslint-disable-next-line security/detect-object-injection
						  `Array.isArray(${this[OPTIONS].name})`
						: 'Array.isArray',

					expected: true,
					received: false,
				}),
			)
		} else {
			if (this.getShape.length !== x.length)
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line security/detect-object-injection
						name: this[OPTIONS].name
							? // eslint-disable-next-line security/detect-object-injection
							  `${this[OPTIONS].name} tuple size`
							: 'tuple size',

						expected: this.getShape.length,
						received: x.length,
					}),
				)

			for (let idx = 0; idx < Math.min(this.getShape.length, x.length); ++idx) {
				// eslint-disable-next-line security/detect-object-injection
				const t = this.getShape[idx] as SchemaLike
				// eslint-disable-next-line security/detect-object-injection
				const r = schema(t).exec(x[idx], options)

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [idx, ...issue.path]

					issues = [...issues, ...r.issues]
				}
			}
		}

		return issues
	}
}