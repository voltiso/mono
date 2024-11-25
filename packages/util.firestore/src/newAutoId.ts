// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

// import { randomBytes } from 'node:crypto'
import randomBytes from 'randombytes'

// copied from 'firebase-admin/firestore'
export function newAutoId(): string {
	// eslint-disable-next-line no-secrets/no-secrets
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let autoId = ''

	while (autoId.length < 20) {
		const bytes = randomBytes(40)

		for (const b of bytes) {
			// Length of `chars` is 62. We only take bytes between 0 and 62*4-1
			// (both inclusive). The value is then evenly mapped to indices of `char`
			// via a modulo operation.
			const maxValue = 62 * 4 - 1

			if (autoId.length < 20 && b <= maxValue) {
				autoId += chars.charAt(b % 62)
			}
		}
	}

	return autoId
}
