// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import { SchemarError } from '~/error/SchemarError'
import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import type { Schema } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'

import type { CustomTransform } from '../options/_/CustomCheck'

/**
 * @throws `SchemarError` wrapped error
 * @internal
 */
function _guardedTransform(operation: CustomTransform, value: unknown) {
	try {
		return operation.transform(value)
	} catch (error) {
		// console.error(error)
		throw new SchemarError(`Custom transform failed`, {
			cause: error,
		})
	}
}

/**
 * Process custom checks and transforms
 *
 * Currently returns at most 1 issue (iteration stops on error to avoid calling
 * callbacks with invalid values)
 *
 * @throws SchemarError in internal error
 * @internal
 */
export function _processCustomOperations(
	input: ProcessCustomOperationsInput,
): ProcessResult {
	const issues = [] as ValidationIssue[]

	let value = input.value

	for (const operation of input.schema.getCustomOperations) {
		if (operation.type === 'check') {
			if (!operation.checkIfValid(value)) {
				issues.push(
					new ValidationIssue({
						name: input.schema.getName,

						expected: {
							description:
								typeof operation.expectedDescription === 'function'
									? operation.expectedDescription(value as never)
									: operation.expectedDescription ||
										`pass custom check (${operation.checkIfValid.toString()})`,
						},

						received: { value },
					}),
				)

				break // design choice - do not call next checks if failed
			}
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		} else if (operation.type === 'transform') {
			if (issues.length > 0) break // do not call transforms with invalid input value

			let nextValue = value

			if ('condition' in operation) {
				const result = schema(operation.condition).exec(nextValue, {
					onUnknownProperty: 'ignore',
				})
				if (result.isValid) {
					nextValue = result.value
				} else continue // skip this operation
			}

			// eslint-disable-next-line etc/no-internal
			value = _guardedTransform(operation, nextValue) // undefined to delete
		} else throw new SchemarError('Internal: unknown custom operation type')
	}

	return { value, issues }
}

//

export interface ProcessCustomOperationsInput {
	schema: Schema
	value: unknown
	options?: Partial<ValidationOptions> | undefined
}

export interface ProcessInput extends ProcessCustomOperationsInput {
	//
}

export interface ProcessResult {
	value: unknown

	/** Releases ownership (not readonly) */
	issues: ValidationIssue[]
}

/** @internal */
export function _process(input: ProcessInput): ProcessResult {
	// ! access protected member
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	const issues: ValidationIssue[] = (input.schema as any)._getIssues(
		input.value,
		input.options,
	) as never

	if (issues.length > 0) return { value: input.value, issues }

	// custom operations are processed only until first issue
	// eslint-disable-next-line etc/no-internal
	return _processCustomOperations(input)
}
