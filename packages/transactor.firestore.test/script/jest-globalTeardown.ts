// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as jestDevServer from 'jest-dev-server'
import * as fs from 'node:fs/promises'

import { getFirebaseJsonPath } from './_/getFirebaseJsonPath'

export = async () => {
	await jestDevServer.teardown()

	// eslint-disable-next-line n/no-process-env
	const port = Number(process.env['PORT'] as string)

	const firebaseJsonPath = getFirebaseJsonPath({ port })

	await fs.rm(firebaseJsonPath)

	// await killJava()
}
