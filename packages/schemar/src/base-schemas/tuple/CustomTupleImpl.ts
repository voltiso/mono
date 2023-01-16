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
	zip,
} from '@voltiso/util'

import type {
	GetDeepShape_,
	SchemaLike,
	TupleOptions,
	ValidationOptions,
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
		return this[OPTIONS].isReadonlyTuple as never
	}

	get getLength(): any {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.getShape.length
	}

	get getShape(): any {
		return this[OPTIONS].shape
	}

	get hasRest(): any {
		return this[OPTIONS].hasRest
	}

	get restSchema(): any {
		return this[OPTIONS].rest
	}

	get getDeepShape(): GetDeepShape_<this> {
		return getDeepShape(this)
	}

	constructor(o: O) {
		super(o)
		Object.freeze(this)
	}

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
		else return super[EXTENDS](other)
	}

	protected override _fix(
		inputValue: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): unknown {
		let value = inputValue

		if (Array.isArray(value) && value.length === this.getShape.length) {
			const fixedArray = value.map((element, idx) =>
				schema(this.getShape[idx]).tryValidate(element, options),
			)

			// eslint-disable-next-line es-x/no-object-is
			if ([...zip(value, fixedArray)].some(([a, b]) => !Object.is(a, b)))
				value = fixedArray
		}

		return value
	}

	override _getIssues(
		value: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		let issues = []

		// eslint-disable-next-line unicorn/no-negated-condition
		if (!Array.isArray(value)) {
			issues.push(
				new ValidationIssue({
					name: this[OPTIONS].name
						? `Array.isArray(${this[OPTIONS].name})`
						: 'Array.isArray',

					expected: { oneOfValues: [true] },
					received: { value: false },
				}),
			)
		} else {
			if (this.hasRest) {
				if (value.length < this.getShape.length) {
					issues.push(
						new ValidationIssue({
							name: this[OPTIONS].name
								? `${this[OPTIONS].name} tuple size`
								: 'tuple size',

							expected: { description: `at least ${this.getShape.length}` },
							received: { value: value.length },
						}),
					)
				}
			} else if (this.getShape.length !== value.length)
				issues.push(
					new ValidationIssue({
						name: this[OPTIONS].name
							? `${this[OPTIONS].name} tuple size`
							: 'tuple size',

						expected: { oneOfValues: [this.getShape.length] },
						received: { value: value.length },
					}),
				)

			for (
				let idx = 0;
				idx < Math.min(this.getShape.length, value.length);
				++idx
			) {
				const t = this.getShape[idx] as SchemaLike

				const r = schema(t).exec(value[idx], options)

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [idx, ...issue.path]

					issues = [...issues, ...r.issues]
				}
			}

			if (this.hasRest) {
				const restSchema = schema(this.restSchema)

				for (let idx = this.getShape.length; idx < value.length; ++idx) {
					const r = restSchema.exec(value[idx], options)

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
