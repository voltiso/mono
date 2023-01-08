// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Reverse_ } from '@voltiso/util'

import type { DataHookConstructor } from './DataHookConstructor'

class DataHookImpl<D extends object> {
	/** - `undefined` === not known yet */
	readonly data?: D | null

	readonly isLoading: boolean

	readonly error?: Error

	get exists(): boolean | undefined {
		if (typeof this.data === 'undefined') return undefined
		else return this.data !== null
	}

	constructor(p: {
		isLoading?: boolean
		data?: D | null
		error?: Error | string
	}) {
		this.isLoading = p.isLoading || false

		if (typeof p.data !== 'undefined') this.data = p.data

		if (p.error)
			this.error = typeof p.error === 'string' ? new Error(p.error) : p.error

		Object.freeze(this)

		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get: (t, p, r) => {
				if (!this.data || p in t) return Reflect.get(t, p, r) as unknown
				else return Reflect.get(this.data, p, r) as unknown
			},
		})
	}
}

export type DataHookLoading<D extends object> = Merge2Reverse_<
	{
		readonly data?: undefined
		readonly isLoading: true
		readonly error?: undefined
		readonly exists: undefined
	},
	{ [k in keyof D]?: undefined }
>

export type DataHookError<D extends object> = Merge2Reverse_<
	{
		readonly data?: undefined
		readonly isLoading: false
		readonly error: Error
		readonly exists: undefined
	},
	{ [k in keyof D]?: undefined }
>

export type DataHookExists<D extends object> = Merge2Reverse_<
	{
		readonly data: D
		readonly isLoading: false
		readonly error?: undefined
		readonly exists: true
	},
	D
>

export type DataHookNotExists<D extends object> = Merge2Reverse_<
	{
		readonly data: null
		readonly isLoading: false
		readonly error?: undefined
		readonly exists: false
	},
	{ [k in keyof D]?: undefined }
>

export type DataHook<D extends object> =
	| DataHookLoading<D>
	| DataHookError<D>
	| DataHookExists<D>
	| DataHookNotExists<D>

export const DataHook = DataHookImpl as unknown as DataHookConstructor
