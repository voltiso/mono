// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { register } from 'esbuild-register/dist/node'

import { patchRequireForEsbuild } from './patchRequireForEsbuild'

type RegisterOptions = Exclude<Parameters<typeof register>[0], undefined>

export function registerEsbuild(esbuildOptions?: RegisterOptions): {
	unregister(): void
} {
	patchRequireForEsbuild()

	const { register } =
		// eslint-disable-next-line @typescript-eslint/consistent-type-imports, n/global-require, unicorn/prefer-module, @typescript-eslint/no-require-imports
		require('esbuild-register/dist/node') as typeof import('esbuild-register/dist/node')
	return register(esbuildOptions)
}
