// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type {
	$Merge,
	$Override_,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
} from '@voltiso/util'
import {
	$fastAssert,
	$final,
	clone,
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

$fastAssert(SCHEMA_NAME)
$fastAssert(EXTENDS)

export abstract class CustomSchemaImpl<
	O extends Partial<SchemaOptions>,
> implements CustomSchema<O> {
	readonly [Voltiso.OPTIONS]: $Override_<this[DEFAULT_OPTIONS], O>

	declare readonly [Voltiso.Schemar.SCHEMA_NAME]: string // SchemaName

	declare readonly [Voltiso.BASE_OPTIONS]: SchemaOptions
	declare readonly [Voltiso.DEFAULT_OPTIONS]: SchemaOptions.Default

	/** Type-only property (no value at runtime) */
	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	get Type(): this[Voltiso.OPTIONS]['Output'] {
		return throwTypeOnlyFieldError()
	}

	/** Type-only property (no value at runtime) */
	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	get Output(): this[Voltiso.OPTIONS]['Output'] {
		return throwTypeOnlyFieldError()
	}

	/** Type-only property (no value at runtime) */
	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	get Input(): this[Voltiso.OPTIONS]['Input'] {
		return throwTypeOnlyFieldError()
	}

	// GET

	get getName(): string | undefined {
		return this[Voltiso.OPTIONS].name
	}

	get isOptional(): this[Voltiso.OPTIONS]['isOptional'] {
		return this[Voltiso.OPTIONS].isOptional as never
	}

	get isStrictOptional(): this[Voltiso.OPTIONS]['isStrictOptional'] {
		return this[Voltiso.OPTIONS].isStrictOptional as never
	}

	get isReadonly(): this[Voltiso.OPTIONS]['isReadonly'] {
		return this[Voltiso.OPTIONS].isReadonly as never
	}

	get hasDefault(): this[Voltiso.OPTIONS]['hasDefault'] {
		return this[Voltiso.OPTIONS].hasDefault as never
	}

	get getDefault(): this[Voltiso.OPTIONS]['hasDefault'] extends false
		? never
		: this[Voltiso.OPTIONS]['Output'] {
		if (!this[Voltiso.OPTIONS].hasDefault)
			throw new SchemarError(`getDefault() no default value specified`)

		const getDefault = (this[Voltiso.OPTIONS] as SchemaOptions).getDefault
		if (getDefault) return getDefault() as never
		else return this[Voltiso.OPTIONS].default as never
	}

	get getCustomOperations(): readonly CustomOperation[] {
		return this[Voltiso.OPTIONS].customOperations
	}

	get getCustomFixes(): readonly CustomFix[] {
		return this[Voltiso.OPTIONS].customFixes
	}

	constructor(partialOptions: O, opts?: { freeze?: boolean }) {
		const options = { ...defaultSchemaOptions, ...partialOptions }

		if (opts?.freeze ?? true) Object.freeze(options)

		this[Voltiso.OPTIONS] = options as never

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
		$fastAssert(OPTIONS)

		const result = clone(this, { omit: [OPTIONS] }) as this

		const newOptions = frozen({ ...this[Voltiso.OPTIONS], ...o })

		Object.defineProperty(result, OPTIONS, {
			value: newOptions,
			// configurable: true,
			// writable: true,
		})

		// ;(result as Mutable<typeof this>)[OPTIONS] = newOptions as never

		$fastAssert(result[OPTIONS] === newOptions)

		return result as never
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	protected _getIssues(
		_value: unknown,
		_options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		return []
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	protected _fix(
		x: unknown,
		_options?: Partial<ValidationOptions> | undefined,
	): unknown {
		return x
	}

	tryValidate<X>(
		x: X,
		options?: Partial<ValidationOptions> | undefined,
	): X | this[Voltiso.OPTIONS]['Output'] {
		const result = this.exec(x, options)
		return result.value as never
	}

	getIssues(
		value: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		return _process({ schema: this, value, options }).issues
	}

	exec(
		inputValue: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationResult<this[Voltiso.OPTIONS]['Output']> {
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

		const result = _process({ schema: this, value, options })

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
	): x is this[Voltiso.OPTIONS]['Input'] {
		return this.exec(x, options).isValid
	}

	assertFixable(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): asserts x is this[Voltiso.OPTIONS]['Input'] {
		const result = this.exec(x, options)
		if (!result.isValid) throw new ValidationError(result.issues)
	}

	/** Check if `value` is already valid, without the need to apply fixes */
	isValid(
		value: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): value is this[Voltiso.OPTIONS]['Output'] {
		const result = this.exec(value, options)

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
	): asserts value is this[Voltiso.OPTIONS]['Output'] {
		const result = this.exec(value, options)

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

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	protected _toString(): string {
		return 'unknown'
	}

	toString(): string {
		const prefix =
			// eslint-disable-next-line no-nested-ternary, sonarjs/expression-complexity
			this.isReadonly && this.isOptional
				? 'readonly?:'
				: // eslint-disable-next-line no-nested-ternary, sonarjs/no-nested-conditional
					this.isReadonly
					? 'readonly:'
					: // eslint-disable-next-line sonarjs/no-nested-conditional
						this.isOptional
						? '?'
						: ''

		const suffix = this.hasDefault ? `=${stringFrom(this.getDefault)}` : ''

		return `${prefix}${this._toString()}${suffix}`
	}

	// BUILDER

	check(
		checkIfValid: (x: this[Voltiso.OPTIONS]['Input']) => boolean,
		expectedDescription?:
			| string
			| ((x: this[Voltiso.OPTIONS]['Input']) => string),
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
		condition: (value: this[Voltiso.OPTIONS]['Output']) => boolean,
		transform: (
			value: this[Voltiso.OPTIONS]['Output'],
		) => this[Voltiso.OPTIONS]['Output'],
	): never {
		return this._cloneWithOptions({
			customOperations: [
				...this.getCustomOperations,
				{
					type: 'transform',

					transform: (value: this[Voltiso.OPTIONS]['Output']) => {
						if (condition(value)) return transform(value)
						else return value // or undefined?
					},
				},
			],
		}) as never
	}

	narrowIf(...args: unknown[]): unknown {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (this.mapIf as any)(...args)
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
	implicitFix(...args: any[]): any {
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

			// eslint-disable-next-line sonarjs/no-undefined-assignment
			default: undefined,
			hasDefault: false,
			// eslint-disable-next-line sonarjs/no-undefined-assignment
			getDefault: undefined,
		}) as never
	}

	get strictOptional(): never {
		return this._cloneWithOptions({
			isOptional: true as const,
			isStrictOptional: true as const,

			// eslint-disable-next-line sonarjs/no-undefined-assignment
			default: undefined,
			hasDefault: false,
			// eslint-disable-next-line sonarjs/no-undefined-assignment
			getDefault: undefined,
		}) as never
	}

	get readonly(): never {
		return this._cloneWithOptions({
			isReadonly: true as const,
		}) as never
	}

	/**
	 * Note: function default has to be wrapped in a function! I.e. if arg is a
	 * function, it will be treated as a getter.
	 */
	default<D>(arg: D | (() => D)): never {
		if (typeof arg === 'function')
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
