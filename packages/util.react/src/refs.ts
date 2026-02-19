// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MutableRefObject, RefCallback, RefObject } from 'react'

export function isRefObject(x: unknown): x is MutableRefObject<unknown> {
	return (x as RefObject<unknown> | null)?.current !== undefined
}

export type MutableRef<T> = MutableRefObject<T> | RefCallback<T> | null

export type GetRefsTypeImpl<Refs, acc> = Refs extends []
	? acc
	: Refs extends [MutableRef<infer HType>, ...infer Tail]
		? GetRefsTypeImpl<Tail, acc & HType>
		: never

export type GetRefsType<Refs extends readonly unknown[]> = GetRefsTypeImpl<
	[...Refs],
	unknown
>

export type RefsResult<Refs extends readonly unknown[]> = RefCallback<
	GetRefsType<Refs>
>

//

export function refs<T>(
	...refs: readonly (MutableRef<T | null> | undefined)[]
): RefCallback<T>

export function refs<
	// eslint-disable-next-line sonarjs/no-redundant-type-constituents
	Refs extends readonly (MutableRef<unknown | null> | undefined)[],
>(...refs: Refs): RefsResult<Refs>

//

export function refs<
	// eslint-disable-next-line sonarjs/no-redundant-type-constituents
	Refs extends readonly (MutableRef<unknown | null> | undefined)[],
>(...refs: Refs): RefsResult<Refs> {
	return (instance: GetRefsType<Refs>) => {
		for (const ref of refs) {
			if (typeof ref === 'function') ref(instance)
			else if (isRefObject(ref)) ref.current = instance
		}
	}
}
