// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Script } from '@voltiso/script'
import { run } from '@voltiso/script'

import { exists } from './_/exists'

// eslint-disable-next-line sonarjs/function-return-type
export function downloadVcpkg(version: string): Script {
	return [
		'mkdir vcpkg -p',
		[
			'cd vcpkg',
			'git init',
			'(git remote add origin https://github.com/microsoft/vcpkg.git || true)',
			`git fetch --depth 1 origin ${version}`,
			'git checkout FETCH_HEAD',
		].join(' && '),
	]
}

export const bootstrapVcpkg = './vcpkg/bootstrap-vcpkg.sh'

export async function installVcpkg(version = '2024.11.16'): Promise<void> {
	if (!(await exists('vcpkg')))
		await run(downloadVcpkg(version), bootstrapVcpkg)

	// await run('ln -sf build/Debug/compile_commands.json')
}
