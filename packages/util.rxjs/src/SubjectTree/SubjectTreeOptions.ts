// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { define } from '@voltiso/util'

import type { _CustomSubjectTree } from '~'

//
export interface SubjectTreeOptions {
	/** The initial value of the subject */
	initialValue?: unknown

	schema?: $$Schemable

	/** Dependency injection */
	dependencies: SubjectTreeOptions.Dependencies
}

export namespace SubjectTreeOptions {
	export interface Default extends SubjectTreeOptions {
		//
	}

	export interface Dependencies {
		inferSchema: s.ImplicitSchemaInferrer$
	}
}

//

export const defaultSubjectTreeOptions: SubjectTreeOptions.Default =
	define<SubjectTreeOptions>().value({
		dependencies: { inferSchema: s.schema },
	})

//

// function finalize<T extends object>(
// 	options: Partial<SubjectTreeOptions<T>>,
// ): SubjectTreeOptions<T> {
// 	return { ...defaultSubjectTreeOptions, ...options }
// }

// const allowedKeys = new Set(['initialValue', 'schema', 'dependencies'] as const)
// type AllowedKey = typeof allowedKeys extends Set<infer T> ? T : never

// function isExactlyPartialOptions<T extends Partial<SubjectTreeOptions>>(
// 	x: T | AlsoAccept<unknown>,
// ): x is Pick<T, AllowedKey> {
// 	if (!isObject(x)) return false

// 	for (const key of Object.keys(x))
// 		if (!allowedKeys.has(key as never)) return false

// 	return true
// }

// export function parseSubjectTreeOptions<T extends object>(
// 	options: SubjectTreeOptionsInput<T>,
// ): SubjectTreeOptions<T> {
// 	const isOptions = isExactlyPartialOptions(options)

// 	if (isOptions) return finalize(options as never)

// 	return finalize({ initialValue: options })
// }

//

/** @internal */
export interface _SubjectTreeChildOptions {
	parent: _CustomSubjectTree
	key: string
}

/** @internal */
// eslint-disable-next-line etc/underscore-internal
export function isSubjectTreeChildOptions(
	x: unknown,
	// eslint-disable-next-line etc/no-internal
): x is _SubjectTreeChildOptions {
	// eslint-disable-next-line etc/no-internal
	return Boolean((x as _SubjectTreeChildOptions | null)?.parent)
}
