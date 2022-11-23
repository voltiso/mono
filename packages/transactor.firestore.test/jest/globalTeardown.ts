// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-console */

import * as fs from 'node:fs/promises'

// import * as jestDevServer from 'jest-dev-server'
import { getFirebaseJsonPath } from './_/getFirebaseJsonPath'

export = async () => {
	// const exitCode = process.exitCode
	// console.log('EXIT CODE', exitCode)

	// eslint-disable-next-line n/no-process-env
	const port = Number(process.env['PORT'] as string)

	console.log('shutting down firestore emulator...')

	// await jestDevServer.teardown() // ! overwrites `exitCode` !

	console.log('shutting down firestore emulator done!')

	// // eslint-disable-next-line require-atomic-updates
	// process.exitCode = exitCode

	const firebaseJsonPath = getFirebaseJsonPath({ port })

	await fs.rm(firebaseJsonPath)

	console.log('deleted firebase config file at', firebaseJsonPath)
	// await killJava()
}
