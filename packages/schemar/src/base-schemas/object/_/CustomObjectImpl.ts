// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import * as v from '@voltiso/util'

import { number } from '~/base-schemas/number/Number'
import { string } from '~/base-schemas/string/String'
import { or } from '~/base-schemas/union/or'
import { isUnknownObjectSchema } from '~/base-schemas/unknownObject/IUnknownObject'
import { symbol } from '~/base-schemas/unknownSymbol/symbol'
import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'
import { defaultValidationOptions } from '~/types/Schema/ValidationOptions'
import { getDeepShape } from '~/types/Schemable/getDeepShape'
import type { $$Schemable, Schemable } from '~/types/Schemable/Schemable'

import type { CustomObject } from '../CustomObject'
import { isObjectSchema } from '../IObject'
import type { ObjectIndexSignatureEntry, ObjectOptions } from '../ObjectOptions'
import { deepPartialShape, deepStrictPartialShape } from './deepPartialShape'
import { partialShape, strictPartialShape } from './partialShape'
/* eslint-disable max-depth */

v.$fastAssert(EXTENDS)
v.$fastAssert(SCHEMA_NAME)
v.$fastAssert(BASE_OPTIONS)

export class CustomObjectImpl<O extends Partial<ObjectOptions>>
	extends v.lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomObject<O>
{
	readonly [SCHEMA_NAME] = 'Object' as const;

	declare readonly [BASE_OPTIONS]: ObjectOptions;
	declare readonly [DEFAULT_OPTIONS]: ObjectOptions.Default

	constructor(partialOptions: O) {
		// super(partialOptions.shape ? {...partialOptions, shape: updateShapeNames() } : partialOptions)
		super(partialOptions)
		Object.freeze(this)
	}

	get isPlain(): any {
		return this[v.OPTIONS].isPlain
	}

	get getShape(): any {
		return this[v.OPTIONS].shape
	}

	get getDeepShape(): any {
		return getDeepShape(this)
	}

	get getIndexSignatures(): this[v.OPTIONS]['indexSignatures'] {
		return this[v.OPTIONS].indexSignatures as never
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

	override [EXTENDS](other: Schema): boolean {
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
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					!schema(this.getShape[key] as {}).extends(value as never)
				)
					// eslint-disable-next-line sonarjs/no-duplicated-branches
					return false
			}

			return true
		} else if (isUnknownObjectSchema(other)) {
			return true
		} else return super[EXTENDS](other)
	}

	override _getIssues(
		x: unknown,
		partialOptions?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		const options = { ...defaultValidationOptions, ...partialOptions }

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

						received: { value: x[key] },
					})

					const onUnknownPropertyResult =
						typeof options.onUnknownProperty === 'function'
							? options.onUnknownProperty(issue)
							: options.onUnknownProperty

					if (
						onUnknownPropertyResult === 'error' ||
						onUnknownPropertyResult === 'warning'
					) {
						issue.severity = onUnknownPropertyResult
						issues.push(issue)
					}
				} else {
					let keyIssues: ValidationIssue[] = []
					let valueIssues: ValidationIssue[] = []

					for (const { keySchema, valueSchema } of this[v.OPTIONS]
						.indexSignatures) {
						const sKeySchema = schema(keySchema) as unknown as Schema
						const sValueSchema = schema(valueSchema) as unknown as Schema

						const keyResult = sKeySchema.exec(key, options)

						if (!keyResult.isValid) {
							keyIssues.push(
								new ValidationIssue({
									name: this[v.OPTIONS].name,
									path: [key],

									expected: {
										// eslint-disable-next-line @typescript-eslint/no-base-to-string
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
										// eslint-disable-next-line @typescript-eslint/no-base-to-string
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
		options?: Partial<ValidationOptions> | undefined,
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
							// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
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

				if (fixedObject[originalXKey] !== xValue || originalXKey !== xKey) {
					isChanged = true

					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					if (xKey !== originalXKey) delete fixedObject[originalXKey]

					if (xValue !== fixedObject[xKey]) fixedObject[xKey] = xValue as never
				}
			}

			// eslint-disable-next-line no-param-reassign
			if (isChanged) value = fixedObject
		}

		return value as never
	}
}
