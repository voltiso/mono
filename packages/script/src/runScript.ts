// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { spawn } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import pc from 'picocolors'

import { registerCleanup, unregisterCleanup } from './_/cleanup'
import { context } from './_/context'
import { getAugmentedPath } from './_/getAugmentedPath'
import { isParallelScript, isRaceScript } from './parallel'
import type { Script } from './Script'

let gScripts: Record<string, string | string[]> | undefined

function getScripts(): Record<string, string | string[]> {
	// console.log('getScripts')

	if (!gScripts) {
		let currentCwd = path.resolve(process.cwd())

		let scripts: Record<string, string | string[]> = {}

		while (currentCwd) {
			const scriptsFilePath = path.join(currentCwd, 'scripts')
			// console.log({scriptsFilePath})

			const suffixes = [
				'',
				// '.ts',
			]

			for (const suffix of suffixes) {
				const requirePath = `${scriptsFilePath}${suffix}`

				try {
					const moreScripts = require(requirePath) as Record<string, string>
					scripts = { ...moreScripts, ...scripts }
				} catch (error) {
					if (
						(error as { code: string } | null)?.code !== 'MODULE_NOT_FOUND' ||
						!(error as { message?: string } | null)?.message?.includes(
							`Cannot find module '${requirePath}'`,
						)
					)
						throw error
				}
			}

			const nextCwd = path.dirname(currentCwd)

			if (nextCwd === currentCwd) break
			currentCwd = nextCwd
		}

		gScripts = scripts
	}

	// console.log('getScripts', gScripts)

	return gScripts
}

let gPackageScripts: Record<string, Script> | undefined

/** @internal */
async function getPackageScripts() {
	// console.log('getPackageScripts')

	if (!gPackageScripts) {
		const packageJsonPath = path.join(process.cwd(), 'package.json')

		const buffer = await fs.readFile(packageJsonPath)
		const packageStr = buffer.toString()
		const packageJson = JSON.parse(packageStr) as {
			scripts: Record<string, string>
		}

		gPackageScripts = Object.fromEntries(
			Object.entries(packageJson.scripts).map(([k, v]) => [
				k,
				v.startsWith('v ') ? v.slice(2) : v,
			]),
		)
	}

	// console.log('packageScripts', gPackageScripts)

	return gPackageScripts
}

const icon = '🐚'

export async function runScript(
	script: Script | Promise<Script>,
	args: string[],
	{ signal }: { signal?: AbortSignal | undefined } = {},
): Promise<void> {
	if (!signal) signal = context.signal

	// if (!signal)
	// 	throw new Error('`runScript`: Internal error: `signal` is required')

	script = await script

	if (!script) return

	if (Array.isArray(script)) {
		const subScripts = await Promise.all(script)

		for (const s of subScripts) {
			await runScript(s, args, { signal })
		}
		return
	}

	if (isParallelScript(script)) {
		// maybe use child signal with a separate controller? probably not needed
		const promises = script.parallel.map(s => runScript(s, args, { signal })) // ! pass args?

		try {
			await Promise.all(promises)
		} catch (error) {
			console.error(
				icon,
				'parallel(...) script failed - aborting other scripts...',
			)

			signal?.dispatchEvent(new Event('abort'))

			// process.exit(1)
			// process.kill(process.pid, 'SIGTERM')

			await Promise.allSettled(promises)

			throw error
		}

		return
	}

	if (isRaceScript(script)) {
		// need new AbortController to kill only this subtree of `race`
		const raceController = new AbortController()
		const listener = () => {
			raceController.abort()
		}
		signal?.addEventListener('abort', listener)

		const promises = script.race.map(s =>
			runScript(s, args, { signal: raceController.signal }),
		) // ! pass args?

		try {
			await Promise.race(promises)
		} finally {
			// console.log(icon, 'race(...) script finished - aborting other scripts...')

			raceController.abort()

			// process.kill(process.pid, 'SIGTERM')
			await Promise.allSettled(promises)

			signal?.removeEventListener('abort', listener)
		}

		return
	}

	if (typeof script === 'function') {
		const result = await script(...args)
		if (result) await runScript(result, [], { signal })
		return
	}

	let tokens = [script, ...args].join(' ').split(' ')
	if (tokens[0] === 'v') tokens = tokens.slice(1)

	;[script, ...args] = tokens as [string, ...string[]]

	// console.log('script', script, script.length)

	console.log(icon, pc.blueBright(script), pc.gray(args.join(' ')))

	const packageScripts = await getPackageScripts()
	const scripts = getScripts()

	const packageScript = packageScripts[script]

	if (packageScript && packageScript !== script) {
		await runScript(packageScript, args, { signal })
		return
	}

	const codeScript = scripts[script]

	if (codeScript) {
		await runScript(codeScript, args, { signal })
		return
	}

	let pid: number | undefined

	// ! `pidtree`
	// const pids = new Set<number>()
	// const collectPids = async () => {
	// 	if (!pid) return
	// 	pids.add(pid)
	// 	try {
	// 		const newPids = await pidtree(pid)
	// 		for (const newPid of newPids) {
	// 			pids.add(newPid)
	// 		}
	// 	} catch {}
	// }

	const command = [script, ...args].join(' ')

	const cpPromise = new Promise<void>((resolve, reject) => {
		// ! The only 2 ways it works are:
		// * Either `detached: true` to create a new process group
		//   (can then kill whole tree)
		// * Or `detached: false` but scan process tree with `pidtree` and kill all manually
		//
		// ! Scanning process tree may be unreliable, and requires external library,
		// ! so for now we use `detached: true` and process.kill(-pid) to kill whole tree.
		const childProcess = spawn(command, {
			shell: true,

			// ! `pipe` is nice - so that orphan processes don't print to console
			// ! BUT with `pipe` console is not dynamic and does not have colors by default
			// (node-pty may fix this)
			// also see `Listr2` and `ink` to see how to merge animated output streams
			// stdio: 'pipe', //
			stdio: 'inherit',

			detached: true, // Create a new process group (can then kill whole tree)
			// signal, // node does not kill firestore emulator

			env: {
				...process.env,
				PATH: getAugmentedPath(),
			},
		})
		pid = childProcess.pid

		// childProcess.stdout.pipe(process.stdout)
		// childProcess.stderr.pipe(process.stderr)

		// only called when `signal` not passed to `spawn`
		const onAbort = async () => {
			// ! `pidtree`
			// await collectPids()
			if (pid) {
				try {
					process.kill(-pid, 'SIGTERM')
					// treeKill(pid, 'SIGTERM')
				} catch {}
			}
			childProcess.kill('SIGTERM') // just in case
			reject(new Error(`${icon} ${command} Aborted`))
		}

		signal?.addEventListener('abort', onAbort)

		childProcess.on('error', async err => {
			// ! `pidtree`
			// await collectPids()
			signal?.removeEventListener('abort', onAbort)
			reject(err)
		})

		childProcess.on('close', async code => {
			// ! `pidtree`
			// await collectPids() // ! pid no longer valid
			signal?.removeEventListener('abort', onAbort)
			if (code && !signal?.aborted) {
				reject(new Error(`${icon} ${command} Non-zero exit code: ${code}`))
			} else {
				resolve()
			}
		})
	})

	const kill = async () => {
		try {
			await cpPromise
		} catch {}

		// ! `pidtree`
		// if (pids.size > 0) {
		// 	await Promise.all(
		// 		pids.keys().map(async pid => {
		// 			try {
		// 				process.kill(pid, 'SIGTERM')
		// 				// console.log('v: manually sent SIGTERM to process', pid)
		// 			} catch {
		// 				return
		// 			}
		// 			for (;;) {
		// 				await new Promise(resolve => setTimeout(resolve, 1000))
		// 				try {
		// 					process.kill(pid, 0)
		// 					// console.log('v: waiting: process still alive', pid)
		// 				} catch {
		// 					break
		// 				}
		// 			}
		// 		}),
		// 	)
		// }
		unregisterCleanup(kill)
	}

	registerCleanup(kill)

	try {
		await cpPromise
	} finally {
		await kill()
	}
}
