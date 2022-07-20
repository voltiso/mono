// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { basename, join } from 'node:path'

const scriptsFile = 'scripts'

type Script = string | ((...args: string[]) => void | Promise<void>)

export async function getScripts(path: string) {
	const paths = []

	for (
		let currentPath = path;
		currentPath !== '';
		currentPath = basename(currentPath)
	) {
		paths.push(currentPath)
	}

	const modules = await Promise.all(
		paths.map(async p => {
			const finalPath = join(p, scriptsFile)
			// eslint-disable-next-line no-unsanitized/method
			return (await import(finalPath)) as Record<string, Script>
		}),
	)

	let scripts = {}

	for (const module of modules) {
		scripts = { ...module, ...scripts }
	}

	return scripts
}
