// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
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
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	new <D extends object>(p: { data: D | null }): DataHook<D>
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	new <D extends object>(p: { error: Error }): DataHook<D>
}

//

export function dataHook<D extends object>(input: {
	isLoading: true
}): DataHookLoading<D>

export function dataHook<D extends object>(input: {
	data: D
}): DataHookExists<D>

export function dataHook<D extends object>(input: {
	data: null
}): DataHookNotExists<D>

export function dataHook<D extends object>(input: {
	data: D | null
}): DataHookExists<D> | DataHookNotExists<D>

export function dataHook<D extends object>(input: {
	error: Error | string
}): DataHookError<D>

export function dataHook<D extends object>(input: {
	data?: D | null | undefined
	isLoading?: boolean | undefined
	error?: Error | string | undefined
}): DataHook<D>

//

// eslint-disable-next-line sonarjs/function-return-type
export function dataHook<D extends object>(input: unknown): DataHook<D> {
	return new DataHook(input as never)
}
