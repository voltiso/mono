// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export class ThemePath {
	path: string[]
	constructor(path: string[] = []) {
		this.path = path

		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get: (t, p, r) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				if (typeof p === 'symbol' || p in t) return Reflect.get(t, p, r)

				return new ThemePath([...this.path, p])
			},
		})
	}

	toString() {
		return `\${${this.path.join('.')}}`
	}
}

// eslint-disable-next-line etc/no-misused-generics
export function createTheme<T>() {
	return new ThemePath() as unknown as T
}
