// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable class-methods-use-this */

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '_'
import { EXTENDS, OPTIONS } from '_'
import type { Assume, AtLeast1, Merge2Simple } from '@voltiso/util'
import { clone, final, isDefined, toString } from '@voltiso/util'

import type {
	CustomFix,
	CustomSchema,
	DefaultSchemaOptions,
	ISchema,
	MergeSchemaOptions,
	Schema,
	Schemable,
	SchemaOptions,
	ValidationIssue,
	ValidationResult,
} from '~'
import {
	defaultSchemaOptions,
	isAny,
	isUnion,
	isUnknown,
	processCustomChecks,
	SchemarError,
	throwTypeOnlyFieldError,
	union,
	ValidationError,
} from '~'
import { isUnknownSchema, schema } from '~/custom-schemas/unknownSchema/index'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomSchemaImpl<O> {
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [PARTIAL_OPTIONS]: O

	// declare [OPTIONS]: Assume<
	// 	SchemaOptions,
	// 	MergeSchemaOptions<DefaultSchemaOptions, O>
	// >

	readonly [BASE_OPTIONS]: SchemaOptions
	readonly [DEFAULT_OPTIONS]: DefaultSchemaOptions
}

export abstract class CustomSchemaImpl<O extends Partial<SchemaOptions>>
	implements CustomSchema<O>, ISchema
{
	[OPTIONS]: Assume<
		this[BASE_OPTIONS],
		MergeSchemaOptions<this[DEFAULT_OPTIONS], this[PARTIAL_OPTIONS]>
	>

	/** Type-only property (no value at runtime) */
	get Type(): this[OPTIONS]['Output'] {
		return throwTypeOnlyFieldError()
	}

	/** Type-only property (no value at runtime) */
	get OutputType(): this[OPTIONS]['Output'] {
		return throwTypeOnlyFieldError()
	}

	/** Type-only property (no value at runtime) */
	get InputType(): this[OPTIONS]['Input'] {
		return throwTypeOnlyFieldError()
	}

	get isOptional(): this[OPTIONS]['isOptional'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isOptional as never
	}

	get isReadonly(): this[OPTIONS]['isReadonly'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonly as never
	}

	get hasDefault(): this[OPTIONS]['hasDefault'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].hasDefault as never
	}

	get getDefault(): this[OPTIONS]['hasDefault'] extends false
		? never
		: this[OPTIONS]['Output'] {
		// eslint-disable-next-line security/detect-object-injection
		if (!this[OPTIONS].hasDefault)
			throw new SchemarError(`getDefault() no default value specified`)

		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].default as never
	}

	get getCustomChecks(): this[OPTIONS]['customChecks'] {
		// eslint-disable-next-line security/detect-object-injection
		const result = this[OPTIONS].customChecks

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!result)
			throw new SchemarError(`getCustomChecks() returned ${toString(result)}`)

		return result as never
	}

	get getCustomFixes(): this[OPTIONS]['customFixes'] {
		// eslint-disable-next-line security/detect-object-injection
		const result = this[OPTIONS].customFixes

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!result)
			throw new SchemarError(`getCustomFixes() returned ${toString(result)}`)

		return result as never
	}

	constructor(partialOptions: O) {
		const options = { ...defaultSchemaOptions, ...partialOptions }
		// eslint-disable-next-line security/detect-object-injection
		this[OPTIONS] = options as never

		final(
			this,
			CustomSchemaImpl,
			'_fix',
			'extends',
			'tryValidate',
			'validate',
			'withCheck',
			'withFix',
			'toString',
		)
	}

	protected _cloneWithOptions<
		OO extends { readonly [k in keyof this[OPTIONS]]?: unknown },
	>(o: OO): CustomSchema<Merge2Simple<O, OO> & SchemaOptions> {
		const r = clone(this)
		// eslint-disable-next-line security/detect-object-injection
		r[OPTIONS] = { ...r[OPTIONS], ...o }
		return r as never
	}

	protected _getIssuesImpl(_x: unknown): ValidationIssue[] {
		return []
	}

	protected _getIssues(x: unknown): ValidationIssue[] {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (typeof x === 'undefined' && this.hasDefault) return []
		else return this._getIssuesImpl(x)
	}

	protected _fixImpl(x: this[OPTIONS]['Input']): this[OPTIONS]['Output'] {
		return x as never
	}

	private _fix(x: unknown): this[OPTIONS]['Output'] {
		let result = x

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (typeof result === 'undefined' && this.hasDefault)
			result = this.getDefault

		for (const customFix of this.getCustomFixes as unknown as CustomFix[]) {
			const nextValue = customFix.fix(result as never)

			if (isDefined(nextValue)) result = nextValue
		}

		return this._fixImpl(result as never)
	}

	tryValidate(x: unknown): ValidationResult<this[OPTIONS]['Output']> {
		const value = this._fix(x)

		const issues = [
			...this._getIssues(value),
			...processCustomChecks(this.getCustomChecks, value),
		]

		if (issues.length === 0)
			return {
				isValid: true,
				value,
				issues: [],
			}
		else
			return {
				isValid: false,
				value,
				issues: issues as AtLeast1<ValidationIssue>,
			}
	}

	validate(x: unknown): never {
		const r = this.tryValidate(x)

		if (r.isValid) return r.value as never
		else throw new ValidationError(r.issues)
	}

	isValid(x: unknown): x is this[OPTIONS]['Output'] {
		return this.tryValidate(x).isValid
	}

	[EXTENDS](other: Schema): boolean {
		if (isUnion(other)) {
			for (const b of other.getSchemas) {
				if (this.extends(b as never)) return true
			}

			return false
		} else if (isUnknownSchema(other)) return true
		else if (isUnknown(other)) return true
		else if (isAny(other)) return true
		else return false
	}

	extends(other: Schemable): boolean {
		const otherType = schema(other)

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (this.isOptional && !otherType.isOptional) return false

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (this.isReadonly && !otherType.isReadonly) return false

		// eslint-disable-next-line security/detect-object-injection
		return this[EXTENDS](otherType as never)
	}

	protected _toString(): string {
		return 'unknown'
	}

	toString(): string {
		const prefix =
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			this.isReadonly && this.isOptional
				? 'readonly?:'
				: // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				this.isReadonly
				? 'readonly:'
				: // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				this.isOptional
				? '?'
				: ''

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const suffix = this.hasDefault ? `=${toString(this.getDefault)}` : ''

		return `${prefix}${this._toString()}${suffix}`
	}

	withCheck(
		checkIfValid: (x: this[OPTIONS]['Input']) => boolean,
		expectedDescription?: string | ((x: this[OPTIONS]['Input']) => string),
	): never {
		const entry =
			typeof expectedDescription === 'undefined'
				? {
						checkIfValid,
				  }
				: {
						checkIfValid,
						expectedDescription,
				  }

		return this._cloneWithOptions({
			customChecks: [...this.getCustomChecks, entry],
		}) as never
	}

	withFix(fixFunc: (x: this[OPTIONS]['Input']) => never): never {
		return this._cloneWithOptions({
			customFixes: [...this.getCustomFixes, { fix: fixFunc }],
		}) as never
	}

	get optional(): never {
		return this._cloneWithOptions({ isOptional: true as const }) as never
	}

	get readonly(): never {
		return this._cloneWithOptions({ isReadonly: true as const }) as never
	}

	default<D>(value: D): never {
		return this._cloneWithOptions({
			hasDefault: true as const,
			default: value,
		}) as never
	}

	or<Other extends Schemable>(other: Other): never {
		// assert(isSchema(this), 'cannot make union of optional/readonly types (can only be used as object properties)')
		return union(this as never, other) as never
	}
}
