// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as jestDevServer from 'jest-dev-server'
import * as path from 'node:path'

import { writeFirebaseJson } from './_/writeFirebaseJson'

export = async () => {
	// // eslint-disable-next-line import/dynamic-import-chunkname
	// const getPortModule = await import('get-port')
	// const getPort = getPortModule.default

	// const port = await getPort()
	const port = 14_395

	// eslint-disable-next-line unicorn/prefer-module
	const cwd = path.resolve(__dirname, '..', 'emulator')

	await writeFirebaseJson({ cwd, port })

	await jestDevServer.setup({
		command: `cd ${cwd} && ../node_modules/.bin/firebase emulators:start --only firestore --config firebase-${port}.json`,
		port,
		usedPortAction: 'error',
	})

	// eslint-disable-next-line n/no-process-env
	process.env['FIRESTORE_EMULATOR_HOST'] = `localhost:${port}`
}
