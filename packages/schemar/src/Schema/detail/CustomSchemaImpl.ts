// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable class-methods-use-this */

import type {
	$$Schemable,
	BASE_OPTIONS,
	CustomFix,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultSchemaOptions,
	PARTIAL_OPTIONS,
	Schemable,
	SchemaLike,
	SchemaOptions,
	ValidateOptions,
	ValidationIssue,
	ValidationResult,
} from '@voltiso/schemar.types'
import {
	defaultValidateOptions,
	EXTENDS,
	isAny,
	isUnion,
	isUnknown,
	isUnknownSchema,
	OPTIONS,
	SCHEMA_NAME,
} from '@voltiso/schemar.types'
import type { AtLeast1, Merge2, Override } from '@voltiso/util'
import { clone, final, isDefined, stringFrom } from '@voltiso/util'

import { union } from '~/custom-schemas/union'
import { schema } from '~/custom-schemas/unknownSchema'
import { ValidationError } from '~/error'
import { SchemarError } from '~/error/SchemarError'

import { defaultSchemaOptions } from '../defaultSchemaOptions'
import { processCustomChecks } from './processCustomChecks'
import { throwTypeOnlyFieldError } from './throwTypeOnlyFieldError'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomSchemaImpl<O> {
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [PARTIAL_OPTIONS]: O

	readonly [BASE_OPTIONS]: SchemaOptions
	readonly [DEFAULT_OPTIONS]: DefaultSchemaOptions
}

export class CustomSchemaImpl<O extends Partial<SchemaOptions>>
	implements CustomSchema<O>
{
	[OPTIONS]: Override<this[DEFAULT_OPTIONS], this[PARTIAL_OPTIONS]>

	/** Type-only property (no value at runtime) */
	get Type(): this[OPTIONS]['Output'] {
		return throwTypeOnlyFieldError()
	}

	/** Type-only property (no value at runtime) */
	get Output(): this[OPTIONS]['Output'] {
		return throwTypeOnlyFieldError()
	}

	/** Type-only property (no value at runtime) */
	get Input(): this[OPTIONS]['Input'] {
		return throwTypeOnlyFieldError()
	}

	get isOptional(): this[OPTIONS]['isOptional'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isOptional as never
	}

	get isStrictOptional(): this[OPTIONS]['isStrictOptional'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isStrictOptional as never
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
		const getDefault = (this[OPTIONS] as SchemaOptions).getDefault
		if (getDefault) return getDefault() as never
		// eslint-disable-next-line security/detect-object-injection
		else return this[OPTIONS].default as never
	}

	get getCustomChecks(): this[OPTIONS]['customChecks'] {
		// eslint-disable-next-line security/detect-object-injection
		const result = this[OPTIONS].customChecks

		// if (!result)
		// 	throw new SchemarError(`getCustomChecks() returned ${stringFrom(result)}`)

		return result as never
	}

	get getCustomFixes(): this[OPTIONS]['customFixes'] {
		// eslint-disable-next-line security/detect-object-injection
		const result = this[OPTIONS].customFixes

		// if (!result)
		// 	throw new SchemarError(`getCustomFixes() returned ${stringFrom(result)}`)

		return result as never
	}

	constructor(partialOptions: O) {
		const options = { ...defaultSchemaOptions, ...partialOptions }
		// eslint-disable-next-line security/detect-object-injection
		this[OPTIONS] = options as never

		final(
			this,
			CustomSchemaImpl,
			'extends',
			'validate',
			'tryValidate',
			'exec',
			'fix',
			'check',
			'toString',
		)
	}

	protected _cloneWithOptions<
		OO extends { readonly [k in keyof this[OPTIONS]]?: unknown },
	>(o: OO): CustomSchema<Merge2<O, OO> & SchemaOptions> {
		const r = clone(this)
		// eslint-disable-next-line security/detect-object-injection
		r[OPTIONS] = { ...r[OPTIONS], ...o }
		return r as never
	}

	protected _getIssuesImpl(_x: unknown): ValidationIssue[] {
		return []
	}

	protected _getIssues(x: unknown): ValidationIssue[] {
		// if (typeof x === 'undefined' && this.hasDefault) return []
		return this._getIssuesImpl(x)
	}

	protected _fixImpl(x: unknown): unknown {
		return x as never
	}

	tryValidate<X>(
		x: X,
		// options?: Partial<ValidateOptions> | undefined,
	): X | this[OPTIONS]['Output'] {
		// const { fix } = { ...defaultValidateOptions, ...options }

		let result = x

		if (typeof result === 'undefined' && this.hasDefault)
			result = this.getDefault as never

		for (const customFix of this.getCustomFixes as unknown as CustomFix[]) {
			const nextValue = customFix.fix(result as never)

			if (isDefined(nextValue)) result = nextValue as never
		}

		return this._fixImpl(result as never) as never
	}

	getIssues(value: unknown): ValidationIssue[] {
		return [
			...this._getIssues(value),
			...processCustomChecks(this.getCustomChecks, value),
		]
	}

	exec(
		value: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): ValidationResult<this[OPTIONS]['Output']> {
		const { fix } = { ...defaultValidateOptions, ...options }

		const finalValue = fix
			? (this.tryValidate(value) as never)
			: (value as never)

		const issues = this.getIssues(finalValue)

		if (issues.length === 0)
			return {
				isValid: true,
				value: finalValue,
				issues: [],
			}
		else
			return {
				isValid: false,
				value: finalValue,
				issues: issues as AtLeast1<ValidationIssue>,
			}
	}

	validate(x: unknown, options?: Partial<ValidateOptions> | undefined): never {
		const r = this.exec(x, options)
		if (!r.isValid) throw new ValidationError(r.issues)
		return r.value as never
	}

	isFixable(x: unknown): x is this[OPTIONS]['Input'] {
		return this.exec(x).isValid
	}

	isValid(x: unknown): x is this[OPTIONS]['Output'] {
		return this.getIssues(x).length === 0
	}

	[EXTENDS](other: SchemaLike): boolean {
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

		if (this.isOptional && !otherType.isOptional) return false

		if (this.isReadonly && !otherType.isReadonly) return false

		// eslint-disable-next-line security/detect-object-injection
		return this[EXTENDS](otherType as never)
	}

	protected _toString(): string {
		return 'unknown'
	}

	toString(): string {
		const prefix =
			this.isReadonly && this.isOptional
				? 'readonly?:'
				: this.isReadonly
				? 'readonly:'
				: this.isOptional
				? '?'
				: ''

		const suffix = this.hasDefault ? `=${stringFrom(this.getDefault)}` : ''

		return `${prefix}${this._toString()}${suffix}`
	}

	check(
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

	fix(fixFunc: (x: this[OPTIONS]['Input']) => never): never {
		return this._cloneWithOptions({
			customFixes: [...this.getCustomFixes, { fix: fixFunc }],
		}) as never
	}

	get optional(): never {
		return this._cloneWithOptions({ isOptional: true as const }) as never
	}

	get strictOptional(): never {
		return this._cloneWithOptions({ isStrictOptional: true as const }) as never
	}

	get readonly(): never {
		return this._cloneWithOptions({ isReadonly: true as const }) as never
	}

	default<D>(arg: D | (() => D)): never {
		// eslint-disable-next-line security/detect-object-injection
		if (typeof arg === 'function' && this[SCHEMA_NAME] !== 'Function')
			return this._cloneWithOptions({
				hasDefault: true as const,
				getDefault: arg,
			}) as never
		else
			return this._cloneWithOptions({
				hasDefault: true as const,
				default: arg,
			}) as never
	}

	or<Other extends $$Schemable>(other: Other): never {
		// assert(isSchema(this), 'cannot make union of optional/readonly types (can only be used as object properties)')
		return union(this as never, other) as never
	}

	get simple(): never {
		return this as never
	}

	Narrow(): never {
		return this as never
	}

	Widen(): never {
		return this as never
	}

	Cast(): never {
		return this as never
	}

	$Cast(): never {
		return this as never
	}

	NarrowOutput(): never {
		return this as never
	}

	WidenOutput(): never {
		return this as never
	}

	CastOutput(): never {
		return this as never
	}

	NarrowInput(): never {
		return this as never
	}

	WidenInput(): never {
		return this as never
	}

	CastInput(): never {
		return this as never
	}
}
