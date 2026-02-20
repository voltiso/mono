// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { spawn } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import pc from 'picocolors'
import treeKill from 'tree-kill'

import { context } from './_/context'
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
		// TODO: use child signal with a separate controller?
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

	const cpPromise = new Promise<void>((resolve, reject) => {
		const command = [script, ...args].join(' ')

		const childProcess = spawn(command, {
			shell: true,
			stdio: 'inherit',
			detached: true, // 1. Create a new process group (easier to kill them all?)
			// signal, // node does not kill correctly - test fails
		})

		// 3. Fallback: If Node's internal signal handling isn't enough for the shell
		const killHandler = () => {
			// console.log('!!!!!!!!!! TREE KILLING', childProcess.pid)
			if (childProcess.pid) {
				// Use tree-kill to wipe out the shell AND the emulator AND the java children
				treeKill(childProcess.pid, 'SIGKILL')
			}
		}

		signal?.addEventListener('abort', killHandler, { once: true })

		childProcess.on('error', err => {
			// console.log('onError', command)
			signal?.removeEventListener('abort', killHandler)
			reject(err)
			// killHandler()
		})

		childProcess.on('close', code => {
			// console.log('onClose', command)
			signal?.removeEventListener('abort', killHandler)
			if (code && !signal?.aborted) {
				reject(new Error(`${icon} ${command} Non-zero exit code: ${code}`))
			} else {
				resolve()
			}
			// killHandler()
		})
	})

	// cpPromises.push(cpPromise)

	await cpPromise

	// console.log('exec done')
}
