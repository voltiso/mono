// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

export class LocalStorage<T> {
	key: string
	defaultValue?: T

	constructor(key: string, defaultValue?: T) {
		this.key = key

		if (defaultValue !== undef) this.defaultValue = defaultValue
	}

	get data(): T {
		const r =
			typeof window !== 'undefined'
				? window.localStorage.getItem(this.key)
				: null

		if (r !== null) return JSON.parse(r) as T
		else if (this.defaultValue !== undef) return this.defaultValue
		else throw new Error(`LocalStorage: '${this.key}' does not exist`)
	}

	set data(x: T) {
		if (typeof window !== 'undefined')
			window.localStorage.setItem(this.key, JSON.stringify(x))
	}

	clear() {
		if (typeof window !== 'undefined') window.localStorage.removeItem(this.key)
	}
}
