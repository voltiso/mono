// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fs from 'node:fs/promises'

export async function writeFirebaseJson(params: {
	port: number
	firebaseJsonPath: string
}): Promise<void> {
	const firebaseJson = {
		emulators: {
			ui: {
				enabled: false,
			},

			firestore: {
				port: params.port,
			},
		},
	}

	// eslint-disable-next-line security/detect-non-literal-fs-filename
	await fs.writeFile(
		params.firebaseJsonPath,
		`// AUTO-GENERATED by script/jest-globalSetup.ts\n${JSON.stringify(
			firebaseJson,
		)}`,
	)
}
