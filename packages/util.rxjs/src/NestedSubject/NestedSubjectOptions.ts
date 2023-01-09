// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, InferAndSimplifyFunction } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { define } from '@voltiso/util'

import type { _CustomNestedSubject } from '~'

//
export interface NestedSubjectOptions {
	/** The initial value of the subject */
	initialValue?: unknown

	schema?: $$Schemable

	/** Dependency injection */
	dependencies: NestedSubjectOptions.Dependencies
}

export namespace NestedSubjectOptions {
	export interface Default extends NestedSubjectOptions {
		//
	}

	export interface Dependencies {
		inferSchema: InferAndSimplifyFunction
	}
}

//

export const defaultNestedSubjectOptions: NestedSubjectOptions.Default =
	define<NestedSubjectOptions>().value({
		dependencies: { inferSchema: s.infer },
	})

//

// function finalize<T extends object>(
// 	options: Partial<NestedSubjectOptions<T>>,
// ): NestedSubjectOptions<T> {
// 	return { ...defaultNestedSubjectOptions, ...options }
// }

// const allowedKeys = new Set(['initialValue', 'schema', 'dependencies'] as const)
// type AllowedKey = typeof allowedKeys extends Set<infer T> ? T : never

// function isExactlyPartialOptions<T extends Partial<NestedSubjectOptions>>(
// 	x: T | AlsoAccept<unknown>,
// ): x is Pick<T, AllowedKey> {
// 	if (!isObject(x)) return false

// 	for (const key of Object.keys(x))
// 		if (!allowedKeys.has(key as never)) return false

// 	return true
// }

// export function parseNestedSubjectOptions<T extends object>(
// 	options: NestedSubjectOptionsInput<T>,
// ): NestedSubjectOptions<T> {
// 	const isOptions = isExactlyPartialOptions(options)

// 	if (isOptions) return finalize(options as never)

// 	return finalize({ initialValue: options })
// }

//

/** @internal */
export interface _NestedSubjectChildOptions {
	parent: _CustomNestedSubject
	key: string
}

/** @internal */
// eslint-disable-next-line etc/underscore-internal
export function isNestedSubjectChildOptions(
	x: unknown,
	// eslint-disable-next-line etc/no-internal
): x is _NestedSubjectChildOptions {
	// eslint-disable-next-line etc/no-internal
	return Boolean((x as _NestedSubjectChildOptions | null)?.parent)
}
