// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { DataHook_ } from './DataHook_.js'
import type { DataHookConstructor } from './DataHookConstructor.js'

// type DataHookBase<D extends object> = DataHook_<D> & Partial<D>

export type DataHookLoading<D extends object> = DataHook_<D> & {
	readonly data: D
	readonly loading: true
	readonly exists?: undefined
} & { [k in keyof D]: undefined }

export type DataHookExists<D extends object> = DataHook_<D> & {
	readonly data: D
	readonly exists: true
} & D

export type DataHookNotExists<D extends object> = DataHook_<D> & {
	readonly data: null
	readonly exists: false
} & { [k in keyof D]: never }

export type DataHookError<D extends object> = DataHook_<D> & {
	readonly error: Error
	readonly exists?: undefined
} & { [k in keyof D]: never }

export type DataHook<D extends object> =
	| DataHookLoading<D>
	| DataHookExists<D>
	| DataHookNotExists<D>
	| DataHookError<D>

export const DataHook = DataHook_ as DataHookConstructor
