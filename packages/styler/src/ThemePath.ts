// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export class ThemePath {
	path: string[]
	constructor(path: string[] = []) {
		this.path = path

		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get: (target, key, receiver) => {
				if (typeof key === 'symbol' || key in target)
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return Reflect.get(target, key, receiver)

				return new ThemePath([...this.path, key])
			},
		})
	}

	toString() {
		return `$__STYLER__{${this.path.join('.')}}`
	}
}

// eslint-disable-next-line etc/no-misused-generics
export function createTheme<T>() {
	return new ThemePath() as unknown as T
}
