const os = require('node:os')

function getExitCodeForSignal(signalName: string): number {
	// Fallback to 1 if the signal isn't found for some reason
	const signalNumber = os.constants.signals[signalName]
	return signalNumber ? 128 + signalNumber : 1
}

//

/** @internal */
let _isShuttingDown = false

type Cleanup = () => void | Promise<unknown>
let _cleanups: Cleanup[] = []

/** @internal */
async function _cleanupAndExit(exitCode: number) {
	if (_isShuttingDown) return
	_isShuttingDown = true

	// console.log('CLEANUP START', exitCode)

	while (_cleanups.length > 0) {
		const cleanups = _cleanups
		_cleanups = []

		await Promise.all(
			cleanups.map(async cleanup => {
				try {
					await cleanup()
				} catch (error) {
					console.error('[Cleanup] Failed during cleanup:', error)
					exitCode = 1
				}
			}),
		)
	}

	process.exit(exitCode)
}

let _isHooked = false
function _hookCleanup() {
	if (_isHooked) return
	_isHooked = true

	const signals = ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT']
	signals.forEach(signal => {
		process.on(signal, () => _cleanupAndExit(getExitCodeForSignal(signal)))
	})

	process.on('uncaughtException', async error => {
		// console.error('Uncaught Exception:', err)
		console.error(error)
		await _cleanupAndExit(1)
	})

	process.on('unhandledRejection', async error => {
		// console.error('Unhandled Rejection:', err)
		console.error(error)
		await _cleanupAndExit(1)
	})

	process.on('beforeExit', async () => {
		// console.log('!!! process.on: beforeExit !!!')
		await _cleanupAndExit(0)
	})
}

export function registerCleanup(cleanup: Cleanup) {
	_hookCleanup()
	_cleanups.push(cleanup)
	if (_isShuttingDown) {
		void cleanup()
	}
}

export function unregisterCleanup(cleanup: Cleanup) {
	const index = _cleanups.lastIndexOf(cleanup)
	if (index !== -1) {
		_cleanups.splice(index, 1)
	}
}
