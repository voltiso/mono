// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { readGitignoreFiles } from 'eslint-gitignore'
import path from 'node:path'

// eslint-disable-next-line no-console
console.log(
	'[@voltiso/config.eslint] baseEslintConfig: reading .gitignores from dir',
	path.resolve(),
)

export const ignorePatterns = [
	'!.*', // Lint hidden stuff (un-ignore)
	'dist/',
	'node_modules/',
	'.tsc-out/',
	'pnpm-lock.yaml',
	...readGitignoreFiles({ cwd: '.' }),
	// ...readGitignoreFiles({ cwd: __dirname }),
	//
]
