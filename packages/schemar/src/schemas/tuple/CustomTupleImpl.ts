// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type {
	DefaultTupleOptions,
	GetTupleLength,
	ISchema,
	ITuple,
	MergeSchemaOptions,
	TupleOptions,
} from '~'
import {
	_extends,
	_extendsArray,
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isArray,
	isTuple,
	isUnknownTuple,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
	ValidationIssue,
} from '~'
import * as s from '~'

export class CustomTupleImpl<O extends Partial<TupleOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements ITuple
{
	declare readonly [SCHEMA_NAME]: 'Tuple';

	declare readonly [BASE_OPTIONS]: TupleOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultTupleOptions;

	declare readonly [PARTIAL_OPTIONS]: O;

	declare readonly [OPTIONS]: Assume<
		TupleOptions,
		MergeSchemaOptions<DefaultTupleOptions, O>
	>

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonlyTuple as never
	}

	get getLength(): GetTupleLength<this[OPTIONS]['elementSchemas']> {
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

	override [EXTENDS](other: ISchema): boolean {
		if (
			(isTuple(other) || isUnknownTuple(other)) &&
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			this.isReadonlyTuple &&
			!other.isReadonlyTuple
		)
			return false

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (isArray(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		if (isTuple(other)) return _extends(this, other)
		else if (isUnknownTuple(other)) return true
		else if (isArray(other)) return _extendsArray(this, other)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
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
				const t = this.getElementSchemas[idx]
				// eslint-disable-next-line security/detect-object-injection
				const r = s.schema(t).tryValidate(x[idx])

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [...issue.path, idx]

					issues = [...issues, ...r.issues]
				}
			}
		}

		return issues
	}
}
