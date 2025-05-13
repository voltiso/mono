// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import fs from 'node:fs/promises'

export async function exists(fileName: string): Promise<boolean> {
	try {
		await fs.access(fileName)
		return true
	} catch {
		return false
	}
}
