// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import path from 'node:path'

import { readGitignoreFiles } from 'eslint-gitignore'

// // eslint-disable-next-line no-console
// console.log(
// 	'[@voltiso/config.eslint] baseEslintConfig: reading .gitignores from dir',
// 	path.resolve(),
// )

const gitIgnored = readGitignoreFiles({ cwd: '.' })
// console.log(path.resolve(), { gitIgnored })

export const ignores = [
	// '!.*', // Lint hidden stuff (un-ignore) // ! no longer ignored by default
	'**/dist/',
	'**/node_modules/',
	'**/.tsc-out/',
	'**/pnpm-lock.yaml',
	'**/traceDir/',
	'**/.turbo/',
	'**/firebase-*.json',
	'**/*.snap',
	'**/*.ts_',
	'**/next-env.d.ts',
	...gitIgnored,
	// ...readGitignoreFiles({ cwd: __dirname }),
	//
] as const
