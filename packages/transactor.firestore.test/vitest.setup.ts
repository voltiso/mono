// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { type ChildProcess, execSync, spawn } from 'node:child_process'
import * as fs from 'node:fs/promises'
import waitPort from 'wait-port'
import { getFirebaseJsonPath } from './util/_/getFirebaseJsonPath'
import { writeFirebaseJson } from './util/_/writeFirebaseJson'

export default async function globalSetup() {
	await execSync('rimraf emulator/firebase-*.json')

	const getPortModule = await import('get-port')
	const getPort = getPortModule.default

	const port = await getPort()
	// const port = 29_495
	console.log('using port', port)

	const firebaseJsonPath = getFirebaseJsonPath({ port })

	console.log('writing firebase.json to', firebaseJsonPath)
	await writeFirebaseJson({ firebaseJsonPath, port })

	let emulator: ChildProcess

	try {
		const cwd = 'emulator'
		const command = '../node_modules/.bin/firebase'
		const args = [
			'emulators:start',
			'--only',
			'firestore',
			'--config',
			`firebase-${port}.json`,
		]

		console.log(
			'starting firebase emulator (make sure Java is installed - `apt install default-jre`)...',
		)
		console.log('🐚', command, ...args)

		emulator = spawn(command, args, { cwd, stdio: 'inherit' })
	} catch (error) {
		console.error('error while starting emulator:', error)
		throw error
	}

	const { open } = await waitPort({
		port,
		timeout: 40_000,
		output: 'silent',
	})

	if (!open) {
		emulator.kill()
		throw new Error(`firebase emulator port ${port} is not open`)
	}

	process.env['FIRESTORE_EMULATOR_HOST'] = `localhost:${port}`

	console.log('firebase emulator started!')

	const onClose = () => {
		emulator.kill() // just in case
		throw new Error(`firebase emulator closed`)
	}

	emulator.on('close', onClose)

	// ! TEARDOWN
	return async () => {
		emulator.off('close', onClose)
		emulator.kill()

		await fs.rm(firebaseJsonPath)
		console.log('deleted firebase config file at', firebaseJsonPath)
	}
}
