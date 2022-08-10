// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-console */

import * as jestDevServer from 'jest-dev-server'
import * as fs from 'node:fs/promises'

import { getFirebaseJsonPath } from './_/getFirebaseJsonPath'

export = async () => {
	console.log('shutting down firestore emulator...')
	await jestDevServer.teardown()
	console.log('shutting down firestore emulator done!')

	// eslint-disable-next-line n/no-process-env
	const port = Number(process.env['PORT'] as string)

	const firebaseJsonPath = getFirebaseJsonPath({ port })

	await fs.rm(firebaseJsonPath)

	console.log('deleted firebase config file at', firebaseJsonPath)
	// await killJava()
}
