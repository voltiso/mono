// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function patchRequireForEsbuild(): void {
	// eslint-disable-next-line n/global-require, unicorn/prefer-module, @typescript-eslint/no-require-imports
	const Module = require('node:module') as NodeJS.Require

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const originalRequire = Module.prototype.require as NodeJS.Require

	function newRequire(this: unknown, id: string): never {
		try {
			return originalRequire.call(this, id) as never
		} catch (error) {
			if (typeof id === 'string' && id.endsWith('.js')) {
				return originalRequire.call(
					this,
					id.slice(0, Math.max(0, id.length - 3)),
				) as never
			} else throw error
		}
	}
	Object.setPrototypeOf(newRequire, originalRequire)

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, sonarjs/class-prototype
	Module.prototype.require = newRequire
}
