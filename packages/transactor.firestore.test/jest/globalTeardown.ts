// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'

// import * as jestDevServer from 'jest-dev-server'
import { getFirebaseJsonPath } from './_/getFirebaseJsonPath'

async function globalTeardown() {
	// const exitCode = process.exitCode
	// console.log('EXIT CODE', exitCode)

	// biome-ignore lint/style/noNonNullAssertion: .
	const port = Number(process.env['PORT']!)

	console.log('shutting down firestore emulator...')

	// await jestDevServer.teardown() // ! overwrites `exitCode` !
	console.log('shutting down firestore emulator done!')

	// process.exitCode = exitCode
	const firebaseJsonPath = getFirebaseJsonPath({ port })

	await fs.rm(firebaseJsonPath)

	console.log('deleted firebase config file at', firebaseJsonPath)
	// await killJava()
}

export default globalTeardown
