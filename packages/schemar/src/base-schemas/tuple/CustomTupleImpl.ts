// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import type {
	GetDeepShape_,
	SchemaLike,
	TupleOptions,
	ValidateOptions,
} from '~'
import {
	CustomSchemaImpl,
	getDeepShape,
	isArraySchema,
	isTupleSchema,
	isUnknownTupleSchema,
} from '~'
import { schema } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'

import { _tupleExtends, _tupleExtendsArray } from './_'

export class CustomTupleImpl<
	O extends Partial<TupleOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	readonly [SCHEMA_NAME] = 'Tuple' as const;

	declare readonly [BASE_OPTIONS]: TupleOptions;
	declare readonly [DEFAULT_OPTIONS]: TupleOptions.Default

	get isReadonlyTuple(): any {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonlyTuple as never
	}

	get getLength(): any {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.getShape.length
	}

	get getShape(): any {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].shape
	}

	get hasRest(): any {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].hasRest
	}

	get restSchema(): any {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].rest
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
			(isTupleSchema(other) || isUnknownTupleSchema(other)) &&
			this.isReadonlyTuple &&
			!other.isReadonlyTuple
		)
			return false

		if (isArraySchema(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		// eslint-disable-next-line etc/no-internal
		if (isTupleSchema(other)) return _tupleExtends(this, other)
		else if (isUnknownTupleSchema(other)) return true
		// eslint-disable-next-line etc/no-internal
		else if (isArraySchema(other)) return _tupleExtendsArray(this, other)
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

		// eslint-disable-next-line unicorn/no-negated-condition
		if (!Array.isArray(x)) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name
						? // eslint-disable-next-line security/detect-object-injection
						  `Array.isArray(${this[OPTIONS].name})`
						: 'Array.isArray',

					expected: { oneOfValues: [true] },
					received: { value: false },
				}),
			)
		} else {
			if (this.hasRest) {
				if (x.length < this.getShape.length) {
					issues.push(
						new ValidationIssue({
							// eslint-disable-next-line security/detect-object-injection
							name: this[OPTIONS].name
								? // eslint-disable-next-line security/detect-object-injection
								  `${this[OPTIONS].name} tuple size`
								: 'tuple size',

							expected: { description: `at least ${this.getShape.length}` },
							received: { value: x.length },
						}),
					)
				}
			} else if (this.getShape.length !== x.length)
				issues.push(
					new ValidationIssue({
						// eslint-disable-next-line security/detect-object-injection
						name: this[OPTIONS].name
							? // eslint-disable-next-line security/detect-object-injection
							  `${this[OPTIONS].name} tuple size`
							: 'tuple size',

						expected: { oneOfValues: [this.getShape.length] },
						received: { value: x.length },
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

			if (this.hasRest) {
				const restSchema = schema(this.restSchema)

				for (let idx = this.getShape.length; idx < x.length; ++idx) {
					// eslint-disable-next-line security/detect-object-injection
					const r = restSchema.exec(x[idx], options)

					if (!r.isValid) {
						for (const issue of r.issues) issue.path = [idx, ...issue.path]

						issues = [...issues, ...r.issues]
					}
				}
			}
		}

		return issues
	}
}
