// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable class-methods-use-this */

import { EXTENDS, SCHEMA_NAME } from '_'
import type { $Merge, $Override_ } from '@voltiso/util'
import {
	$assert,
	$final,
	BASE_OPTIONS,
	clone,
	DEFAULT_OPTIONS,
	frozen,
	omitUndefined,
	OPTIONS,
	stringFrom,
} from '@voltiso/util'

import { isAnySchema } from '~/base-schemas/any/IAny'
import { and } from '~/base-schemas/intersection/Intersection'
import { isUnionSchema, or } from '~/base-schemas/union'
import { isUnknownSchema } from '~/base-schemas/unknown/IUnknown'
import { unknown } from '~/base-schemas/unknown/Unknown'
import { isSchemaInferrer } from '~/core-schemas/schemaInferrer/ISchemaInferrer'
import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import { ValidationError } from '~/error'
import { SchemarError } from '~/error/SchemarError'
import { infer_ } from '~/infer/infer'
import type { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import type { ValidationResult } from '~/meta-schemas/validationResult/validationResult'
import type { CustomSchema } from '~/types/Schema/CustomSchema'
import type { SchemaLike } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'
import type { $$Schemable, Schemable } from '~/types/Schemable/Schemable'

import type { CustomFix, CustomOperation, SchemaOptions } from '../options'
import { defaultSchemaOptions } from '../options'
import { _process } from './processCustomOperations'
import { throwTypeOnlyFieldError } from './throwTypeOnlyFieldError'

export abstract class CustomSchemaImpl<O extends Partial<SchemaOptions>>
	implements CustomSchema<O>
{
	readonly [OPTIONS]: $Override_<this[DEFAULT_OPTIONS], O>;

	declare readonly [SCHEMA_NAME]: string; // SchemaName

	declare readonly [BASE_OPTIONS]: SchemaOptions;
	declare readonly [DEFAULT_OPTIONS]: SchemaOptions.Default

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

	// GET

	get getName(): string | undefined {
		return this[OPTIONS].name
	}

	get isOptional(): this[OPTIONS]['isOptional'] {
		return this[OPTIONS].isOptional as never
	}

	get isStrictOptional(): this[OPTIONS]['isStrictOptional'] {
		return this[OPTIONS].isStrictOptional as never
	}

	get isReadonly(): this[OPTIONS]['isReadonly'] {
		return this[OPTIONS].isReadonly as never
	}

	get hasDefault(): this[OPTIONS]['hasDefault'] {
		return this[OPTIONS].hasDefault as never
	}

	get getDefault(): this[OPTIONS]['hasDefault'] extends false
		? never
		: this[OPTIONS]['Output'] {
		if (!this[OPTIONS].hasDefault)
			throw new SchemarError(`getDefault() no default value specified`)

		const getDefault = (this[OPTIONS] as SchemaOptions).getDefault
		if (getDefault) return getDefault() as never
		else return this[OPTIONS].default as never
	}

	get getCustomOperations(): readonly CustomOperation[] {
		return this[OPTIONS].customOperations
	}

	get getCustomFixes(): readonly CustomFix[] {
		return this[OPTIONS].customFixes
	}

	constructor(partialOptions: O, opts?: { freeze?: boolean }) {
		const options = { ...defaultSchemaOptions, ...partialOptions }

		if (opts?.freeze ?? true) Object.freeze(options)

		this[OPTIONS] = options as never

		$final(this, CustomSchemaImpl, [
			'extends',
			'validate',
			'tryValidate',
			'exec',
			'fix',
			'check',
			'toString',
		])
	}

	protected _cloneWithOptions<
		OO extends { [k in keyof this[BASE_OPTIONS]]?: unknown },
	>(o: OO): CustomSchema<$Merge<O, OO> & Partial<SchemaOptions>> {
		$assert(OPTIONS)

		const result = clone(this, { omit: [OPTIONS] }) as this

		const newOptions = frozen({ ...this[OPTIONS], ...o })

		Object.defineProperty(result, OPTIONS, {
			value: newOptions,
			// configurable: true,
			// writable: true,
		})

		// ;(result as Mutable<typeof this>)[OPTIONS] = newOptions as never

		$assert(result[OPTIONS] === newOptions)

		return result as never
	}

	protected _getIssues(
		_value: unknown,
		_options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		return []
	}

	protected _fix(
		x: unknown,
		_options?: Partial<ValidationOptions> | undefined,
	): unknown {
		return x
	}

	tryValidate<X>(
		x: X,
		options?: Partial<ValidationOptions> | undefined,
	): X | this[OPTIONS]['Output'] {
		const result = this.exec(x, options)
		return result.value as never
	}

	getIssues(
		value: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		// eslint-disable-next-line etc/no-internal
		return _process({ schema: this, value, options }).issues
	}

	exec(
		inputValue: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationResult<this[OPTIONS]['Output']> {
		let value = inputValue

		/** Apply custom fixes */
		for (const customFix of this.getCustomFixes as unknown as CustomFix[]) {
			const result = customFix.inputSchema.exec(value, {
				onUnknownProperty: 'ignore',
			})
			if (!result.isValid) continue

			try {
				value = customFix.fix(result.value) // undefined to delete
			} catch (error) {
				throw new SchemarError(`Custom fix failed: ${stringFrom(customFix)}`, {
					cause: error,
				})
			}
		}

		/** Apply builtin fixes */
		if (value === undefined && this.hasDefault) value = this.getDefault as never
		value = this._fix(value, options) as never

		/** Also calls customOperations */
		// eslint-disable-next-line etc/no-internal
		const result = _process({ schema: this, value, options })

		// eslint-disable-next-line es-x/no-array-prototype-every
		const isValid = result.issues.every(issue => issue.severity !== 'error')

		return {
			isValid,
			value: result.value,
			issues: result.issues,
		} as never
	}

	validate(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): never {
		const r = this.exec(x, options)
		if (!r.isValid) throw new ValidationError(r.issues)
		return r.value as never
	}

	isFixable(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): x is this[OPTIONS]['Input'] {
		return this.exec(x, options).isValid
	}

	assertFixable(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): asserts x is this[OPTIONS]['Input'] {
		const result = this.exec(x, options)
		if (!result.isValid) throw new ValidationError(result.issues)
	}

	/** Check if `value` is already valid, without the need to apply fixes */
	isValid(
		value: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): value is this[OPTIONS]['Output'] {
		const result = this.exec(value, options)
		// eslint-disable-next-line es-x/no-object-is
		return result.isValid && Object.is(result.value, value)
	}

	/**
	 * Asserts `value` is already valid, without the need to apply fixes
	 *
	 * @throws `ValidationError`
	 */
	assertValid(
		value: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): asserts value is this[OPTIONS]['Output'] {
		const result = this.exec(value, options)
		// eslint-disable-next-line es-x/no-object-is
		const wasAlreadyValid = result.isValid && Object.is(result.value, value)

		if (!wasAlreadyValid) {
			throw new ValidationError(this.getIssues(value, options))
		}
	}

	//

	//

	[EXTENDS](other: SchemaLike): boolean {
		if (isUnionSchema(other)) {
			for (const b of other.getSchemas) {
				if (this.extends(b as never)) return true
			}

			return false
		} else if (isSchemaInferrer(other)) return true
		else if (isUnknownSchema(other)) return true
		else if (isAnySchema(other)) return true
		else return false
	}

	extends(other: Schemable): boolean {
		const otherType = schema(other)

		if (this.isOptional && !otherType.isOptional) return false
		if (this.isReadonly && !otherType.isReadonly) return false

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

	// BUILDER

	check(
		checkIfValid: (x: this[OPTIONS]['Input']) => boolean,
		expectedDescription?: string | ((x: this[OPTIONS]['Input']) => string),
	): never {
		const entry = omitUndefined({
			type: 'check',
			checkIfValid,
			expectedDescription,
		})

		return this._cloneWithOptions({
			customOperations: [...this.getCustomOperations, entry],
		}) as never
	}

	map(...args: [unknown] | [unknown, unknown]): any {
		const [condition, transform] =
			args.length === 2 ? args : [undefined, args[0]]

		return this._cloneWithOptions({
			customOperations: [
				...this.getCustomOperations,
				args.length === 2
					? { type: 'transform', condition, transform }
					: { type: 'transform', transform },
			],
		}) as never
	}

	mapIf(
		condition: (value: this[OPTIONS]['Output']) => boolean,
		transform: (value: this[OPTIONS]['Output']) => this[OPTIONS]['Output'],
	) {
		return this._cloneWithOptions({
			customOperations: [
				...this.getCustomOperations,
				{
					type: 'transform',

					transform: (value: this[OPTIONS]['Output']) => {
						if (condition(value)) return transform(value)
						else return value // or undefined?
					},
				},
			],
		}) as never
	}

	narrowIf(...args: any): any {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (this.mapIf as any)(...args)
	}

	narrow(...args: any): any {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return this.map(...args)
	}

	//

	fix(schemable: $$Schemable, fix: (x: any) => never): never {
		return this._cloneWithOptions({
			customFixes: [
				...this.getCustomFixes,
				{ inputSchema: infer_(schemable), fix },
			],
		}) as never
	}

	/** Same as `.fix` - different typings */
	implicitFix(...args: any): any {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (this.fix as any)(...args)
	}

	fixIf(predicate: (value: unknown) => boolean, fix: (x: any) => never): never {
		return this._cloneWithOptions({
			customFixes: [
				...this.getCustomFixes,
				{ inputSchema: unknown.check(predicate), fix },
			],
		}) as never
	}

	//

	get deleted(): any {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		return this.map(() => undefined).optional as never
	}

	//

	name(name: string): this {
		return this._cloneWithOptions({ name }) as never
	}

	get optional(): never {
		return this._cloneWithOptions({
			isOptional: true as const,
			isStrictOptional: false as const,

			default: undefined,
			hasDefault: false,
			getDefault: undefined,
		}) as never
	}

	get strictOptional(): never {
		return this._cloneWithOptions({
			isOptional: true as const,
			isStrictOptional: true as const,

			default: undefined,
			hasDefault: false,
			getDefault: undefined,
		}) as never
	}

	get readonly(): never {
		return this._cloneWithOptions({
			isReadonly: true as const,
		}) as never
	}

	default<D>(arg: D | (() => D)): never {
		if (typeof arg === 'function' && this[SCHEMA_NAME] !== 'Function')
			return this._cloneWithOptions({
				hasDefault: true as const,
				getDefault: arg as never,

				isOptional: false,
				isStrictOptional: false,
			}) as never
		else
			return this._cloneWithOptions({
				hasDefault: true as const,
				default: arg,

				isOptional: false,
				isStrictOptional: false,
			}) as never
	}

	or<Other extends $$Schemable>(other: Other): never {
		// assert(isSchema(this), 'cannot make union of optional/readonly types (can only be used as object properties)')
		return or(this as never, other) as never
	}

	and<Other extends $$Schemable>(other: Other): never {
		// assert(isSchema(this), 'cannot make union of optional/readonly types (can only be used as object properties)')
		return and(this as never, other)
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
