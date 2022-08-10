// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-invalid-this */

export function patchRequireForEsbuild() {
	// eslint-disable-next-line n/global-require, unicorn/prefer-module
	const Module = require('node:module') as NodeRequire

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const originalRequire = Module.prototype.require as NodeRequire

	function newRequire(this: unknown, id: string): never {
		try {
			return originalRequire.call(this, id) as never
		} catch (error) {
			if (id.endsWith('.js')) {
				return originalRequire.call(
					this,
					// eslint-disable-next-line no-magic-numbers
					id.slice(0, Math.max(0, id.length - 3)),
				) as never
			} else throw error
		}
	}
	Object.setPrototypeOf(newRequire, originalRequire)

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	Module.prototype.require = newRequire
}
