// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
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

$fastAssert(BASE_OPTIONS)
$fastAssert(DEFAULT_OPTIONS)
$fastAssert(OPTIONS)
$fastAssert(SCHEMA_NAME)
$fastAssert(EXTENDS)

export class CustomTupleImpl<
	O extends Partial<TupleOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Tuple' as const

	declare readonly [Voltiso.BASE_OPTIONS]: TupleOptions
	declare readonly [Voltiso.DEFAULT_OPTIONS]: TupleOptions.Default

	get isReadonlyTuple(): any {
		return this[Voltiso.OPTIONS].isReadonlyTuple as never
	}

	get getLength(): any {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.getShape.length
	}

	get getShape(): any {
		return this[Voltiso.OPTIONS].shape
	}

	get hasRest(): any {
		return this[Voltiso.OPTIONS].hasRest
	}

	get restSchema(): any {
		return this[Voltiso.OPTIONS].rest
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

	// eslint-disable-next-line sonarjs/cyclomatic-complexity
	override [Voltiso.Schemar.EXTENDS](other: SchemaLike): boolean {
		if (
			(isTupleSchema(other) || isUnknownTupleSchema(other)) &&
			this.isReadonlyTuple &&
			!other.isReadonlyTuple
		)
			return false

		if (isArraySchema(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		if (isTupleSchema(other)) return _tupleExtends(this, other)
		else if (isUnknownTupleSchema(other)) return true
		else if (isArraySchema(other)) return _tupleExtendsArray(this, other)
		else return super[Voltiso.Schemar.EXTENDS](other)
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

			if ([...zip(value, fixedArray)].some(([a, b]) => !Object.is(a, b)))
				value = fixedArray
		}

		return value
	}

	// eslint-disable-next-line sonarjs/cyclomatic-complexity
	override _getIssues(
		value: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		let issues = []

		if (!Array.isArray(value)) {
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name
						? `Array.isArray(${this[Voltiso.OPTIONS].name})`
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
							name: this[Voltiso.OPTIONS].name
								? `${this[Voltiso.OPTIONS].name} tuple size`
								: 'tuple size',

							expected: { description: `at least ${this.getShape.length}` },
							received: { value: value.length },
						}),
					)
				}
			} else if (this.getShape.length !== value.length)
				issues.push(
					new ValidationIssue({
						name: this[Voltiso.OPTIONS].name
							? `${this[Voltiso.OPTIONS].name} tuple size`
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
					// eslint-disable-next-line sonarjs/nested-control-flow
					for (const issue of r.issues) issue.path = [idx, ...issue.path]

					issues = [...issues, ...r.issues]
				}
			}

			if (this.hasRest) {
				const restSchema = schema(this.restSchema)

				for (let idx = this.getShape.length; idx < value.length; ++idx) {
					const r = restSchema.exec(value[idx], options)

					// eslint-disable-next-line sonarjs/nested-control-flow
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
