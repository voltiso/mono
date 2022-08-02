// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { DataHook } from './DataHook'

export interface DataHookConstructor {
	// eslint-disable-next-line etc/no-misused-generics
	new <D extends object>(p: { loading: boolean }): DataHook<D>
	new <D extends object>(p: { data: D | null }): DataHook<D>
	// eslint-disable-next-line etc/no-misused-generics
	new <D extends object>(p: { error: Error }): DataHook<D>
}

// eslint-disable-next-line etc/no-misused-generics
export function dataHook<D extends object>(p: { loading: boolean }): DataHook<D>
export function dataHook<D extends object>(p: { data: D | null }): DataHook<D>
// eslint-disable-next-line etc/no-misused-generics
export function dataHook<D extends object>(p: { error: Error }): DataHook<D>

export function dataHook(p: any) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return new DataHook(p)
}
