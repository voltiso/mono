/* eslint-disable max-depth */
// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type {
	CustomObject,
	DefaultObjectOptions,
	GetDeepShape_,
	ISchema,
	ObjectIndexSignatureEntry,
	ObjectOptions,
	Schemable,
} from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import { isUnknownObject } from '@voltiso/schemar.types'
import { EXTENDS, OPTIONS, SCHEMA_NAME } from '@voltiso/schemar.types'
import { getDeepShape } from '@voltiso/schemar.types'
import {
	getEntries,
	getValues,
	hasProperty,
	isObject,
	lazyConstructor,
	undef,
} from '@voltiso/util'

import { isSchema } from '~'
import {
	CustomSchemaImpl,
	deepPartialShape,
	deepStrictPartialShape,
	partialShape,
	strictPartialShape,
	ValidationIssue,
} from '~'
import { number } from '~/custom-schemas/number'
import { string } from '~/custom-schemas/string'
import { union } from '~/custom-schemas/union'
import { schema } from '~/custom-schemas/unknownSchema'
import { symbol } from '~/custom-schemas/unknownSymbol'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomObjectImpl<O> {
	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions
}

export class CustomObjectImpl<O extends Partial<ObjectOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomObject<O>
{
	readonly [SCHEMA_NAME] = 'Object' as const

	constructor(partialOptions: O) {
		super(partialOptions)

		for (const value of getValues(this.getShape, { includeSymbols: true })) {
			if (isSchema(value) && value.hasDefault) {
				// eslint-disable-next-line security/detect-object-injection
				this[OPTIONS].hasDefault = true as never
				// eslint-disable-next-line security/detect-object-injection
				this[OPTIONS].default = {} as never
			}
		}
	}

	get getShape(): this[OPTIONS]['shape'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['shape'] as never
	}

	get getDeepShape(): GetDeepShape_<this> {
		return getDeepShape(this)
	}

	get getIndexSignatures(): this[OPTIONS]['indexSignatures'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['indexSignatures'] as never
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
			args.length === 2 ? args : [union(string, number, symbol), args[0]]

		return this._cloneWithOptions({
			indexSignatures: [
				// eslint-disable-next-line security/detect-object-injection
				...this[OPTIONS].indexSignatures,
				{ keySchema, valueSchema },
			],
		}) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (t.isObject(other)) {
			for (const [k, v] of getEntries(other.getShape)) {
				const hasThisK = hasProperty(this.getShape, k)
				// eslint-disable-next-line security/detect-object-injection
				const isOtherOptional = schema(other.getShape[k]).isOptional

				if (!hasThisK && !isOtherOptional) return false
				// eslint-disable-next-line security/detect-object-injection
				else if (hasThisK && !schema(this.getShape[k] as {}).extends(v))
					// eslint-disable-next-line sonarjs/no-duplicated-branches
					return false
			}

			return true
		} else if (isUnknownObject(other)) {
			return true
			// eslint-disable-next-line security/detect-object-injection
		} else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (!isObject(x)) {
			issues.push(
				new ValidationIssue({
					expectedDescription: 'be object',
					received: x,
				}),
			)
		} else {
			for (const [k, v] of getEntries(this.getShape, {
				includeSymbols: true,
			}) as [keyof any, Schemable][]) {
				const tv = schema(v)

				const isOptional = tv.isOptional || tv.isStrictOptional

				if (isOptional && !hasProperty(x, k)) continue

				// assumeType<ISchema>(tv)

				const value = x[k as keyof typeof x]

				const r = tv.exec(value)

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [k, ...issue.path]

					issues = [...issues, ...r.issues]
				}
			}

			for (const [key, value] of getEntries(x as Record<keyof any, unknown>, {
				includeSymbols: true,
			})) {
				if (!hasProperty(this.getShape, key)) {
					//! util TODO: hasProperty should only type-guard for literal types
					// eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unnecessary-condition
					if (this[OPTIONS].indexSignatures.length === 0)
						issues.push(
							new ValidationIssue({
								path: [key],
								expectedDescription: 'not be present',
								// eslint-disable-next-line security/detect-object-injection
								received: x[key],
							}),
						)
					else {
						let keyIssues: ValidationIssue[] = []
						let valueIssues: ValidationIssue[] = []

						// eslint-disable-next-line security/detect-object-injection
						for (const { keySchema, valueSchema } of this[OPTIONS]
							.indexSignatures) {
							const sKeySchema = schema(keySchema)
							const sValueSchema = schema(valueSchema)

							const keyResult = sKeySchema.exec(key)

							if (!keyResult.isValid) {
								keyIssues.push(
									new ValidationIssue({
										path: [key],
										expectedDescription: `match index signature key: ${sKeySchema.toString()}`,
										received: key,
									}),
								)

								for (const childIssue of keyResult.issues) {
									childIssue.path = [key, ...childIssue.path]
								}

								keyIssues = [...keyIssues, ...keyResult.issues]
								continue
							}

							const valueResult = sValueSchema.exec(value)

							if (!valueResult.isValid) {
								valueIssues.push(
									new ValidationIssue({
										path: [key],
										expectedDescription: `match index signature value: ${sValueSchema.toString()}`,
										received: value,
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
									path: [key],
									expectedDescription: `match one of index signature keys`,

									expectedOneOf:
										// eslint-disable-next-line security/detect-object-injection
										(this[OPTIONS] as ObjectOptions).indexSignatures.map(
											signature => schema(signature.keySchema),
										),

									received: key,
								}),
							)

							issues = [...issues, ...keyIssues]
						}
					}
				}
			}
		}

		return issues
	}

	override _fixImpl(x: unknown): unknown {
		// eslint-disable-next-line no-param-reassign
		x = super._fixImpl(x)

		// let autoCreated = false
		if (x === undefined) {
			// eslint-disable-next-line no-param-reassign
			x = {}
			// autoCreated = true
		}

		if (typeof x === 'object') {
			// eslint-disable-next-line no-param-reassign
			x = { ...x } as Record<keyof any, unknown>

			for (const [key, schemable] of getEntries(this.getShape) as [
				keyof any,
				Schemable,
			][]) {
				const mySchema = schema(schemable)

				const isOptional = mySchema.isOptional || mySchema.isStrictOptional

				$assert(typeof x === 'object' && x)

				if (!hasProperty(x, key) && isOptional && !mySchema.hasDefault) {
					// assert(
					// 	typeof tv.getDefault === 'undefined',
					// 	"typeof tv.getDefault === 'undefined'"
					// )
					continue
				}

				// assumeType<ISchema>(mySchema)

				const result = mySchema.exec(x[key as keyof typeof x])
				x[key as keyof typeof x] = result.value as never

				if (result.value === undef && mySchema.isOptional)
					delete x[key as keyof typeof x]
			}

			$assert(typeof x === 'object' && x)

			for (let [xKey, xValue] of getEntries(x, { includeSymbols: true }) as [
				keyof any,
				unknown,
			][]) {
				const originalXKey = xKey
				if (xKey in this.getShape) continue

				for (const indexSignature of this
					.getIndexSignatures as ObjectIndexSignatureEntry[]) {
					const keyValidationResult = schema(indexSignature.keySchema).exec(
						xKey,
					)

					const valueValidationResult = schema(indexSignature.valueSchema).exec(
						xValue,
					)

					if (keyValidationResult.isValid && valueValidationResult.isValid) {
						xKey = keyValidationResult.value as never
						xValue = valueValidationResult.value
					}
				}

				delete x[originalXKey as keyof typeof x]
				x[xKey as keyof typeof x] = xValue as never
			}
		}

		// if (
		// 	autoCreated &&
		// 	getKeys(x as never, { includeSymbols: true }).length === 0
		// ) {
		// 	// eslint-disable-next-line no-param-reassign
		// 	x = undefined
		// }

		// eslint-disable-next-line no-param-reassign
		x = super._fixImpl(x)

		return x as never
	}
}
