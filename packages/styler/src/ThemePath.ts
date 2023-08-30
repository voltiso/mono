// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isObject, isPlainObject } from '@voltiso/util'

export class ThemePath {
	path: string[]

	constructor(path: string[] = []) {
		this.path = path

		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get: (target, key, receiver) => {
				if (typeof key === 'symbol' || key in target)
					return Reflect.get(target, key, receiver)

				return new ThemePath([...this.path, key])
			},
		})
	}

	toString() {
		return `$\{${this.path.join('.')}}`
		// return `$__STYLER__{${this.path.join('.')}}`
	}
}

export function isThemePath(x: unknown): x is ThemePath {
	return (
		isObject(x) && !isPlainObject(x) && Array.isArray((x as ThemePath).path)
	)
}

export function createTheme<T>() {
	return new ThemePath() as unknown as T
}
