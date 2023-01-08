// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import * as v from '@voltiso/util'

import type {
	$$Schemable,
	CustomObject,
	DefaultObjectOptions,
	GetDeepShape_,
	ISchema,
	ObjectIndexSignatureEntry,
	ObjectOptions,
	Schemable,
	ValidateOptions,
} from '~'
import {
	CustomSchemaImpl,
	defaultValidateOptions,
	getDeepShape,
	isObjectSchema,
	isUnknownObjectSchema,
	number,
	string,
	symbol,
} from '~'
import { or } from '~/base-schemas/union/or'
import { schema } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'

import { deepPartialShape, deepStrictPartialShape } from './deepPartialShape'
import { partialShape, strictPartialShape } from './partialShape'
/* eslint-disable max-depth */

v.$assert(EXTENDS)
v.$assert(SCHEMA_NAME)

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomObjectImpl<O> {
	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions
}

export class CustomObjectImpl<O extends Partial<ObjectOptions>>
	extends v.lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomObject<O>
{
	readonly [SCHEMA_NAME] = 'Object' as const

	// /**
	//  * Note: auto-defaulting is enabled only if using `infer` function (disabled
	//  * for explicit `s.object({ ... })` calls)
	//  */
	// constructor(partialOptions: O) {
	// 	super(partialOptions)

	// 	// console.log('CustomObject constructor', this[OPTIONS])

	// 	let canBeAutoDefaulted = true

	// 	for (const value of getValues(this.getShape, {
	// 		includeSymbols: true,
	// 	}) as unknown[]) {
	// 		if (
	// 			!isSchema(value) ||
	// 			(!value.hasDefault && !value.isOptional && !value.isStrictOptional)
	// 		) {
	// 			canBeAutoDefaulted = false
	// 			break
	// 		}
	// 	}

	// 	if (canBeAutoDefaulted) {
	// 		// eslint-disable-next-line security/detect-object-injection
	// 		this[OPTIONS].hasDefault = true as never
	// 		// eslint-disable-next-line security/detect-object-injection
	// 		this[OPTIONS].default = {} as never
	// 	}
	// }

	get getShape(): this[v.OPTIONS]['shape'] {
		return this[v.OPTIONS]['shape'] as never
	}

	get getDeepShape(): GetDeepShape_<this> {
		return getDeepShape(this)
	}

	get getIndexSignatures(): this[v.OPTIONS]['indexSignatures'] {
		return this[v.OPTIONS]['indexSignatures'] as never
	}

	override and(other: $$Schemable): never {
		const otherSchema = schema(other)

		if (!isObjectSchema(otherSchema)) {
			return super.and(otherSchema)
		}

		const a = this[v.OPTIONS]

		const b = otherSchema[v.OPTIONS]

		return this._cloneWithOptions({
			shape: { ...this.getShape, ...otherSchema.getShape },
			customChecks: [...a.customChecks, ...b.customChecks],
			customFixes: [...a.customFixes, ...b.customFixes],
			hasDefault: a.hasDefault || b.hasDefault,
			default: b.hasDefault ? b.default : a.default,
			getDefault: b.hasDefault ? b.getDefault : a.getDefault,
			isOptional: a.isOptional && b.isOptional,
			isStrictOptional: a.isStrictOptional && b.isStrictOptional,
			indexSignatures: [...a.indexSignatures, ...b.indexSignatures],
			isReadonly: a.isReadonly && b.isReadonly,
			isPlain: a.isPlain || b.isPlain,
		}) as never
	}

	get plain(): never {
		// console.log('CustomObjectImpl_.plain', this[OPTIONS])
		return this._cloneWithOptions({
			isPlain: true,
		}) as never
	}

	get partial(): never {
		return this._cloneWithOptions({
			shape: partialShape(this.getShape as never) as unknown as never,
		}) as never
	}

	get strictPartial(): never {
		return this._cloneWithOptions({
			shape: strictPartialShape(this.getShape as never) as unknown as never,
		}) as never
	}

	get deepPartial(): never {
		return this._cloneWithOptions({
			shape: deepPartialShape(this.getShape as never) as unknown as never,
		}) as never
	}

	get deepStrictPartial(): never {
		return this._cloneWithOptions({
			shape: deepStrictPartialShape(this.getShape as never) as unknown as never,
		}) as never
	}

	index(...args: [Schemable] | [Schemable, Schemable]): never {
		const [keySchema, valueSchema] =
			args.length === 2 ? args : [or(string, number, symbol), args[0]]

		return this._cloneWithOptions({
			indexSignatures: [
				...this[v.OPTIONS].indexSignatures,
				{ keySchema, valueSchema },
			],
		}) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isObjectSchema(other)) {
			for (const [key, value] of v.getEntries(other.getShape, {
				includeSymbols: true,
			}) as [keyof any, unknown][]) {
				const hasThisK = v.hasProperty(this.getShape, key)

				const isOtherOptional = schema<$$Schemable>(
					other.getShape[key as never],
				).isOptional

				if (!hasThisK && !isOtherOptional) return false
				else if (
					hasThisK &&
					// eslint-disable-next-line security/detect-object-injection
					!schema(this.getShape[key] as {}).extends(value as never)
				)
					// eslint-disable-next-line sonarjs/no-duplicated-branches
					return false
			}

			return true
		} else if (isUnknownObjectSchema(other)) {
			return true
			// eslint-disable-next-line security/detect-object-injection
		} else return super[EXTENDS](other)
	}

	override _getIssues(
		x: unknown,
		partialOptions?: Partial<ValidateOptions> | undefined,
	): ValidationIssue[] {
		const options = { ...defaultValidateOptions, ...partialOptions }

		// console.log('CustomObjectImpl._getIssuesImpl', this[OPTIONS])
		let issues: ValidationIssue[] = []

		// eslint-disable-next-line unicorn/no-negated-condition
		if (!v.isObject(x)) {
			issues.push(
				new ValidationIssue({
					name: this[v.OPTIONS].name,
					expected: { description: 'be object' },
					received: { value: x },
				}),
			)
		} else {
			if (this[v.OPTIONS].isPlain && !v.isPlainObject(x)) {
				issues.push(
					new ValidationIssue({
						name: this[v.OPTIONS].name,
						expected: { description: 'be plain object' },
						received: { value: x },
					}),
				)
			}

			for (const [key, value] of v.getEntries(this.getShape, {
				includeSymbols: true,
			}) as [keyof any, Schemable][]) {
				const childSchema = schema(value)

				const isOptional =
					childSchema.isOptional || childSchema.isStrictOptional

				if (isOptional && !v.hasProperty(x, key)) continue

				// assumeType<ISchema>(tv)

				if (!v.hasProperty(x, key) && !isOptional && !childSchema.hasDefault) {
					issues.push(
						new ValidationIssue({
							name: this[v.OPTIONS].name,
							path: [key],
							expected: { description: 'be present' },
							// receivedDescription: 'missing object property',
							// received: x[k as keyof typeof x],
						}),
					)

					continue
				}

				const val = x[key as keyof typeof x]

				const r = childSchema.exec(val, options)

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [key, ...issue.path]

					issues = [...issues, ...r.issues]
				}
			}

			for (const [key, value] of v.getEntries(
				x as unknown as Record<keyof any, unknown>,
				{
					includeSymbols: true,
				},
			)) {
				// TODO: `util` - hasProperty should only type-guard for literal types
				if (v.hasProperty(this.getShape, key)) continue

				if (this[v.OPTIONS].indexSignatures.length === 0) {
					const issue = new ValidationIssue({
						name: this[v.OPTIONS].name,
						path: [key],
						expected: { description: 'not be present' },
						received: { value: x[key as never] },
					})

					if (
						options.onUnknownProperty === 'error' ||
						options.onUnknownProperty === 'warning'
					) {
						issue.severity = options.onUnknownProperty
						issues.push(issue)
					} else if (typeof options.onUnknownProperty === 'function') {
						options.onUnknownProperty(issue)
					}
				} else {
					let keyIssues: ValidationIssue[] = []
					let valueIssues: ValidationIssue[] = []

					for (const { keySchema, valueSchema } of this[v.OPTIONS]
						.indexSignatures) {
						const sKeySchema = schema(keySchema) as unknown as ISchema
						const sValueSchema = schema(valueSchema) as unknown as ISchema

						const keyResult = sKeySchema.exec(key, options)

						if (!keyResult.isValid) {
							keyIssues.push(
								new ValidationIssue({
									name: this[v.OPTIONS].name,
									path: [key],

									expected: {
										description: `match index signature key: ${sKeySchema.toString()}`,
									},

									received: { value: key },
								}),
							)

							for (const childIssue of keyResult.issues) {
								childIssue.path = [key, ...childIssue.path]
							}

							keyIssues = [...keyIssues, ...keyResult.issues]
							continue
						}

						const valueResult = sValueSchema.exec(value, options)

						if (!valueResult.isValid) {
							valueIssues.push(
								new ValidationIssue({
									name: this[v.OPTIONS].name,
									path: [key],

									expected: {
										description: `match index signature value: ${sValueSchema.toString()}`,
									},

									received: { value },
								}),
							)

							for (const childIssue of valueResult.issues) {
								childIssue.path = [key, ...childIssue.path]
							}

							valueIssues = [...valueIssues, ...valueResult.issues]
						}
					}

					if (valueIssues.length > 0) {
						issues = [...issues, ...valueIssues]
					} else if (keyIssues.length > 0) {
						issues.push(
							new ValidationIssue({
								name: this[v.OPTIONS].name,
								path: [key],

								expected: {
									description: `match one of index signature keys`,

									oneOfValues: (
										this[v.OPTIONS] as ObjectOptions
									).indexSignatures.map(signature =>
										schema(signature.keySchema),
									),
								},

								received: { value: key },
							}),
						)

						issues = [...issues, ...keyIssues]
					}
				}
			}
		}

		return issues
	}

	override _fix(
		value: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): unknown {
		if (typeof value === 'object' && value !== null) {
			// x = { ...x } as Record<keyof any, unknown>
			const fixedObject = v.clone(value) as Record<keyof any, unknown>
			let isChanged = false

			for (const [key, nested] of v.getEntries(this.getShape) as [
				keyof any,
				Schemable,
			][]) {
				const mySchema = schema(nested)

				const isOptional = mySchema.isOptional || mySchema.isStrictOptional

				if (v.hasProperty(fixedObject, key) || mySchema.hasDefault) {
					const result = mySchema.exec(fixedObject[key as never], options)

					if (result.value === undefined && isOptional) {
						if (Object.prototype.hasOwnProperty.call(fixedObject, key)) {
							delete fixedObject[key as never]
							isChanged = true
						}
					} else if (fixedObject[key as never] !== result.value) {
						fixedObject[key as never] = result.value as never
						isChanged = true
					}
				}
			}

			// $assert.object(x)

			for (let [xKey, xValue] of v.getEntries(fixedObject, {
				includeSymbols: true,
			}) as [keyof any, unknown][]) {
				const originalXKey = xKey
				if (xKey in this.getShape) continue

				for (const indexSignature of this
					.getIndexSignatures as ObjectIndexSignatureEntry[]) {
					const keyValidationResult = schema(indexSignature.keySchema).exec(
						xKey,
						options,
					)

					const valueValidationResult = schema(indexSignature.valueSchema).exec(
						xValue,
						options,
					)

					if (keyValidationResult.isValid && valueValidationResult.isValid) {
						xKey = keyValidationResult.value as never
						xValue = valueValidationResult.value
					}
				}

				// eslint-disable-next-line security/detect-object-injection
				if (fixedObject[originalXKey] !== xValue || originalXKey !== xKey)
					isChanged = true

				// eslint-disable-next-line security/detect-object-injection
				delete fixedObject[originalXKey]
				// eslint-disable-next-line security/detect-object-injection
				fixedObject[xKey] = xValue as never
			}

			// eslint-disable-next-line no-param-reassign
			if (isChanged) value = fixedObject
		}

		return value as never
	}
}
