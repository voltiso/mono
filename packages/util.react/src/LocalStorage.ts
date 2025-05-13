// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

export class LocalStorage<T> {
	key: string
	defaultValue: T | undefined
	hasDefaultValue: boolean

	constructor(key: string, defaultValue?: T) {
		this.key = key

		this.hasDefaultValue = arguments.length >= 2
		this.defaultValue = defaultValue
	}

	get data(): T {
		const stringData =
			// eslint-disable-next-line unicorn/no-negated-condition
			typeof window !== 'undefined'
				? // eslint-disable-next-line n/no-unsupported-features/node-builtins
					window.localStorage.getItem(this.key)
				: null

		if (stringData !== null) return JSON.parse(stringData) as T

		if (this.hasDefaultValue) return this.defaultValue as T

		throw new Error(
			`util.react.LocalStorage: '${this.key}' does not exist (forgot to supply defaultValue?)`,
		)
	}

	set data(x: T) {
		if (typeof window !== 'undefined')
			// eslint-disable-next-line n/no-unsupported-features/node-builtins
			window.localStorage.setItem(this.key, JSON.stringify(x))
	}

	clear(): void {
		// eslint-disable-next-line n/no-unsupported-features/node-builtins
		if (typeof window !== 'undefined') window.localStorage.removeItem(this.key)
	}
}
