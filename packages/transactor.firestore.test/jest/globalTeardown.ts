// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-console */

import * as fs from 'node:fs/promises'

// import * as jestDevServer from 'jest-dev-server'
import { getFirebaseJsonPath } from './_/getFirebaseJsonPath'

// eslint-disable-next-line import/no-anonymous-default-export, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export default async () => {
	// const exitCode = process.exitCode
	// console.log('EXIT CODE', exitCode)

	// eslint-disable-next-line n/no-process-env, turbo/no-undeclared-env-vars, @typescript-eslint/no-non-null-assertion
	const port = Number(process.env['PORT']!)

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
