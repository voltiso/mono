// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as jestDevServer from 'jest-dev-server'

import { getCwd } from './_/getCwd'
import { getFirebaseJsonPath } from './_/getFirebaseJsonPath'
import { writeFirebaseJson } from './_/writeFirebaseJson'

export = async () => {
	// eslint-disable-next-line import/dynamic-import-chunkname
	const getPortModule = await import('get-port')
	const getPort = getPortModule.default

	const port = await getPort()
	// const port = 14_395

	const firebaseJsonPath = getFirebaseJsonPath({ port })

	await writeFirebaseJson({ firebaseJsonPath, port })

	const cwd = getCwd()

	await jestDevServer.setup({
		command: `cd ${cwd} && ../node_modules/.bin/firebase emulators:start --only firestore --config firebase-${port}.json`,
		port,
		usedPortAction: 'error',
		launchTimeout: 20_000, // needs more time if ran via `turbo` (for some reason?)
	})

	// eslint-disable-next-line n/no-process-env
	process.env['FIRESTORE_EMULATOR_HOST'] = `localhost:${port}`

	// eslint-disable-next-line n/no-process-env
	process.env['PORT'] = `${port}`
}
