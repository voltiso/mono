// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type AsyncHooksModule = typeof import('async_hooks')
// export type AsyncHooksModule = typeof import('node:async_hooks')

let _asyncHooks: AsyncHooksModule | undefined

export function requireAsyncHooks(): AsyncHooksModule {
	if (!_asyncHooks) {
		try {
			// eslint-disable-next-line n/global-require, unicorn/prefer-module, unicorn/prefer-node-protocol
			const asyncHooks = require('async_hooks') as
				| Partial<AsyncHooksModule>
				| undefined

			// eslint-disable-next-line unicorn/error-message
			if (!asyncHooks?.AsyncLocalStorage) throw new Error()

			_asyncHooks = asyncHooks as never
		} catch {
			throw new Error(
				`@voltiso/context: NodeContext requires 'async_hooks' module, which is not available in this NodeJS version. Please use 'ZoneContext' instead.`,
			)
		}
	}

	return _asyncHooks
}

//

export function haveAsyncHooks(): boolean {
	try {
		requireAsyncHooks()
		return true
	} catch {
		return false
	}
}
