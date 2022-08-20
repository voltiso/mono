// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from '@voltiso/util'

import type { DataHookConstructor } from '.'

class DataHookImpl<D extends object> {
	/** - `undefined` === not known yet */
	readonly data?: D | null

	readonly loading: boolean

	readonly error?: Error

	get exists() {
		if (this.data === undefined) return undefined
		else return this.data !== null
	}

	constructor(p: { loading?: boolean; data?: D | null; error?: Error }) {
		this.loading = p.loading || false

		if (typeof p.data !== 'undefined') this.data = p.data

		if (p.error) this.error = p.error

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

export type DataHook<D extends object> = Merge2_<Partial<D>, DataHookImpl<D>>

export const DataHook = DataHookImpl as DataHookConstructor
