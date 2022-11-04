// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	DataHookError,
	DataHookExists,
	DataHookLoading,
	DataHookNotExists,
} from './DataHook'
import { DataHook } from './DataHook'

export interface DataHookConstructor {
	new <D extends object>(p: { isLoading: boolean }): DataHook<D>
	new <D extends object>(p: { data: D | null }): DataHook<D>
	new <D extends object>(p: { error: Error }): DataHook<D>
}

export function dataHook<D extends object>(p: {
	isLoading: true
}): DataHookLoading<D>

export function dataHook<D extends object>(p: { data: D }): DataHookExists<D>

export function dataHook<D extends object>(p: {
	data: null
}): DataHookNotExists<D>

export function dataHook<D extends object>(p: {
	data: D | null
}): DataHookExists<D> | DataHookNotExists<D>

export function dataHook<D extends object>(p: {
	error: Error | string
}): DataHookError<D>

export function dataHook<D extends object>(p: {
	data?: D | null | undefined
	isLoading?: boolean | undefined
	error?: Error | string | undefined
}): DataHook<D>

export function dataHook(p: unknown) {
	return new DataHook(p as never)
}
