// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubjectImpl } from '~/NestedSubjectImpl'

import type { ObserverDiContext } from './ObserverDiContext'

export type NestedSubjectRootOptions = {
	initialValue?: unknown
}

export type NestedSubjectWithSchemaRootOptions<S> = {
	diContext: ObserverDiContext
	schemable: S
	initialValue?: unknown
}

export type NestedSubjectChildOptions = {
	parent: NestedSubjectImpl<any>
	key: string
}

export function isNestedSubjectChildOptions(
	x: unknown,
): x is NestedSubjectChildOptions {
	return Boolean((x as NestedSubjectChildOptions | null)?.parent)
}