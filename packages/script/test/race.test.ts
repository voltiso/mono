// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { run } from '~'

describe('Script Runner: Race Mode', () => {
	it('should resolve when the fastest script finishes', async () => {
		const script = {
			race: [
				'node -e "setTimeout(() => process.exit(0), 100)"', // Fast
				'node -e "setTimeout(() => process.exit(0), 5000)"', // Slow
			],
		}

		const startTime = Date.now()
		await run(script)
		const duration = Date.now() - startTime

		// It should finish closer to 100ms than 1000ms
		expect(duration).toBeLessThan(4000)
	})

	it('should abort the loser when the winner finishes', async () => {
		// We'll use a file as a "heartbeat" to see if the loser kept running

		const fs = await import('node:fs')

		const heartbeatFile = '/tmp/voltiso-script-test-loser-heartbeat.txt'

		if (fs.existsSync(heartbeatFile)) fs.unlinkSync(heartbeatFile)

		const script = {
			race: [
				'node -e "setTimeout(() => process.exit(0), 100)"', // Winner
				// Loser tries to write to a file after 500ms
				`node -e "setTimeout(() => require('fs').writeFileSync('${heartbeatFile}', 'alive'), 1000)"`,
			],
		}

		expect(fs.existsSync(heartbeatFile)).toBe(false)

		await run(script)

		expect(fs.existsSync(heartbeatFile)).toBe(false)

		// console.log('run finished')

		// Wait a bit to ensure the loser HAD time to write if it wasn't killed
		await new Promise(resolve => void setTimeout(resolve, 1000))

		// console.log('final check')

		expect(fs.existsSync(heartbeatFile)).toBe(false)
	})

	it('should handle non-zero exit codes in race members', async () => {
		const script = {
			race: [
				'node -e "process.exit(1)"', // Fails immediately
				'node -e "setTimeout(() => {}, 5000)"',
			],
		}

		// Depending on your implementation, if the first one fails,
		// the race might reject or wait for a winner.
		// Usually, for race scripts, the first completion (win or fail) wins.
		await expect(run(script)).rejects.toThrow(/Non-zero exit code: 1/u)
	})
})
