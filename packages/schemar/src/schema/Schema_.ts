// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jsdoc/require-returns */
/* eslint-disable class-methods-use-this */

import { assert } from '@voltiso/assertor'
import type { AtLeast1, Merge2Simple } from '@voltiso/util'
import { clone, final, toString } from '@voltiso/util'

import { SchemarError, ValidationError } from '../errors'
import { union } from '../s'
import * as s from '../s'
import { isUnion } from '../s/union'
import { isUnknown } from '../s/unknown'
import { isUnknownSchema } from '../s/unknownSchema'
import type { ValidationResult } from '../s/validation/validationResult'
import { processCustomChecks } from './_/processCustomChecks.js'
import { EXTENDS } from './_/symbols.js'
import { throwTypeOnlyFieldError } from './_/throwTypeOnlyFieldError.js'
import type { CustomSchema } from './CustomSchema.js'
import type { IRootSchema } from './IRootSchema.js'
import type { ISchema } from './ISchema.js'
import { IS_SCHEMA } from './ISchema.js'
import type { Schemable } from './Schemable.js'
import type { SchemaOptions } from './SchemaOptions.js'
import { OPTIONS } from './SchemaOptions.js'

export abstract class Schema_<O extends SchemaOptions>
	implements CustomSchema<O>
{
	readonly [IS_SCHEMA] = true as const;
	[OPTIONS]: O

	/** Type-only property (no value at runtime) */
	get Type(): O['_out'] {
		return throwTypeOnlyFieldError()
	}

	/** Type-only property (no value at runtime) */
	get OutputType(): O['_out'] {
		return throwTypeOnlyFieldError()
	}

	/** Type-only property (no value at runtime) */
	get InputType(): O['_in'] {
		return throwTypeOnlyFieldError()
	}

	get isOptional(): O['isOptional'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isOptional
	}

	get isReadonly(): O['isReadonly'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonly
	}

	get hasDefault(): O['hasDefault'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].hasDefault
	}

	get getDefault(): O['hasDefault'] extends false ? never : O['_out'] {
		// eslint-disable-next-line security/detect-object-injection
		if (!this[OPTIONS].hasDefault)
			throw new SchemarError(`getDefault() no default value specified`)

		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].default as never
	}

	get getCustomChecks(): O['customChecks'] {
		// eslint-disable-next-line security/detect-object-injection
		const result = this[OPTIONS].customChecks

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!result)
			throw new SchemarError(`getCustomChecks() returned ${toString(result)}`)

		return result
	}

	constructor(o: O) {
		assert(o, 'Schema_ constructor called with no options argument')
		// eslint-disable-next-line security/detect-object-injection
		this[OPTIONS] = o

		final(
			this,
			Schema_,
			'_fix',
			'extends',
			'tryValidate',
			'validate',
			'check',
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

	protected _getIssuesImpl(_x: unknown): s.ValidationIssue[] {
		return []
	}

	protected _getIssues(x: unknown): s.ValidationIssue[] {
		if (typeof x === 'undefined' && this.hasDefault) return []
		else return this._getIssuesImpl(x)
	}

	protected _fixImpl(x: unknown): unknown {
		return x
	}

	private _fix(x: unknown): unknown {
		const r = typeof x === 'undefined' && this.hasDefault ? this.getDefault : x
		return this._fixImpl(r)
	}

	tryValidate(x: unknown): ValidationResult<this['OutputType']> {
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
				issues: issues as AtLeast1<s.ValidationIssue>,
			}
	}

	validate(x: unknown): this['OutputType'] {
		const r = this.tryValidate(x)

		if (r.isValid) return r.value
		else throw new ValidationError(r.issues)
	}

	isValid(x: unknown): x is this['OutputType'] {
		return this.tryValidate(x).isValid
	}

	[EXTENDS](other: ISchema): boolean {
		if (isUnion(other)) {
			for (const b of other.getSchemas) {
				if (this.extends(b as never)) return true
			}

			return false
		} else if (isUnknownSchema(other)) return true
		else if (isUnknown(other)) return true
		else return false
	}

	extends(other: Schemable): boolean {
		const otherType = s.schema(other)

		if (this.isOptional && !otherType.isOptional) return false

		if (this.isReadonly && !otherType.isReadonly) return false

		// eslint-disable-next-line security/detect-object-injection
		return this[EXTENDS](otherType as never)
	}

	protected _toString() {
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

		const suffix = this.hasDefault ? `=${toString(this.getDefault)}` : ''

		return `${prefix}${this._toString()}${suffix}`
	}

	check(
		checkIfValid: (x: this['InputType']) => boolean,
		expectedDescription?: string | ((x: this['InputType']) => string),
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

	or<Other extends IRootSchema>(other: Other): never {
		// assert(isSchema(this), 'cannot make union of optional/readonly types (can only be used as object properties)')
		return union(this as never, other) as never
	}
}
