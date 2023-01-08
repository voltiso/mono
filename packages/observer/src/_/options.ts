// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferAndSimplifyFunction, Schema } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type { AlsoAccept } from '@voltiso/util'
import { define, isObject } from '@voltiso/util'

import type { NestedSubjectImpl } from '~/impl/NestedSubjectImpl'

export interface NestedSubjectOptions<T extends object = object> {
	/**
	 * The initial value of the subject
	 *
	 * @defaultValue `{}`
	 */
	initialValue?: T

	schema?: Schema<T>

	/** Dependency injection */
	dependencies: NestedSubjectDependencies
}

export interface NestedSubjectDependencies {
	schema: InferAndSimplifyFunction
}

//

export const defaultNestedSubjectOptions = define<NestedSubjectOptions>().value(
	{
		dependencies: { schema: s.infer },
	},
)

//

function finalize<T extends object>(
	options: Partial<NestedSubjectOptions<T>>,
): NestedSubjectOptions<T> {
	return { ...defaultNestedSubjectOptions, ...options }
}

export type NestedSubjectOptionsInput<T extends object = object> =
	| T
	| Partial<NestedSubjectOptions<T>>

const allowedKeys = new Set(['initialValue', 'schema', 'dependencies'] as const)
type AllowedKey = typeof allowedKeys extends Set<infer T> ? T : never

function isExactlyPartialOptions<T extends Partial<NestedSubjectOptions>>(
	x: T | AlsoAccept<unknown>,
): x is Pick<T, AllowedKey> {
	if (!isObject(x)) return false

	for (const key of Object.keys(x))
		if (!allowedKeys.has(key as never)) return false

	return true
}

export function parseNestedSubjectOptions<T extends object>(
	options: NestedSubjectOptionsInput<T>,
): NestedSubjectOptions<T> {
	const isOptions = isExactlyPartialOptions(options)

	if (isOptions) return finalize(options as never)

	return finalize({ initialValue: options })
}

//

/** @internal */
// eslint-disable-next-line etc/underscore-internal
export type NestedSubjectChildOptions = {
	parent: NestedSubjectImpl<any>
	key: string
}

export function isNestedSubjectChildOptions(
	x: unknown,
	// eslint-disable-next-line etc/no-internal
): x is NestedSubjectChildOptions {
	// eslint-disable-next-line etc/no-internal
	return Boolean((x as NestedSubjectChildOptions | null)?.parent)
}
