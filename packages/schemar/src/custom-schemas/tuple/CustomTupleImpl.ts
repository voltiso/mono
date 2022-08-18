// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '_'
import { EXTENDS, OPTIONS, SCHEMA_NAME } from '_'
import { lazyConstructor } from '@voltiso/util'

import type {
	DefaultTupleOptions,
	GetTupleLength_,
	ISchema,
	ITuple,
	TupleOptions,
} from '~'
import {
	_extends,
	_extendsArray,
	CustomSchemaImpl,
	isArray,
	isTuple,
	isUnknownTuple,
	schema,
	ValidationIssue,
} from '~'

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

export class CustomTupleImpl<O extends Partial<TupleOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements ITuple
{
	readonly [SCHEMA_NAME] = 'Tuple' as const

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonlyTuple as never
	}

	get getLength(): GetTupleLength_<this[OPTIONS]['elementSchemas']> {
		return this.getElementSchemas.length as never
	}

	get getElementSchemas(): this[OPTIONS]['elementSchemas'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].elementSchemas as never
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

	override [EXTENDS](other: ISchema): boolean {
		if (
			(isTuple(other) || isUnknownTuple(other)) &&
			this.isReadonlyTuple &&
			!other.isReadonlyTuple
		)
			return false

		if (isArray(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		if (isTuple(other)) return _extends(this, other)
		else if (isUnknownTuple(other)) return true
		else if (isArray(other)) return _extendsArray(this, other)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (!Array.isArray(x)) {
			issues.push(
				new ValidationIssue({
					name: 'Array.isArray',
					expected: true,
					received: false,
				}),
			)
		} else {
			if (this.getElementSchemas.length !== x.length)
				issues.push(
					new ValidationIssue({
						name: 'tuple size',
						expected: this.getElementSchemas.length,
						received: x.length,
					}),
				)

			for (
				let idx = 0;
				idx < Math.min(this.getElementSchemas.length, x.length);
				++idx
			) {
				// eslint-disable-next-line security/detect-object-injection
				const t = this.getElementSchemas[idx] as ISchema
				// eslint-disable-next-line security/detect-object-injection
				const r = schema(t).tryValidate(x[idx])

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [...issue.path, idx]

					issues = [...issues, ...r.issues]
				}
			}
		}

		return issues
	}
}
