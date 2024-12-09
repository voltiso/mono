// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { spawn } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import chalk from 'chalk'

import { context } from './_bin/v'
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

				// eslint-disable-next-line sonarjs/nested-control-flow
				try {
					// eslint-disable-next-line import/no-dynamic-require, n/global-require, unicorn/prefer-module, @typescript-eslint/no-require-imports
					const moreScripts = require(requirePath) as Record<string, string>
					scripts = { ...moreScripts, ...scripts }
				} catch (error) {
					// eslint-disable-next-line max-depth
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
		// eslint-disable-next-line require-atomic-updates
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

// eslint-disable-next-line sonarjs/cyclomatic-complexity
export async function runScript(
	script: Script | Promise<Script>,
	args: string[],
	{ signal }: { signal?: AbortSignal | undefined } = {},
): Promise<void> {
	// eslint-disable-next-line no-param-reassign
	if (!signal) signal = context.signal

	// if (!signal)
	// 	throw new Error('`runScript`: Internal error: `signal` is required')

	// eslint-disable-next-line require-atomic-updates, no-param-reassign
	script = await script

	if (!script) return

	if (Array.isArray(script)) {
		const subScripts = await Promise.all(script)

		for (const s of subScripts) {
			// eslint-disable-next-line no-await-in-loop
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
			// eslint-disable-next-line no-console
			console.error(
				icon,
				'parallel(...) script failed - aborting other scripts...',
			)

			signal?.dispatchEvent(new Event('abort'))

			// process.exit(1)
			// process.kill(process.pid, 'SIGTERM')

			// eslint-disable-next-line es-x/no-promise-all-settled
			await Promise.allSettled(promises)

			throw error
		}

		return
	}

	if (isRaceScript(script)) {
		// TODO: use child signal with a separate controller?
		const promises = script.race.map(s => runScript(s, args, { signal })) // ! pass args?
		try {
			await Promise.race(promises)
		} finally {
			// eslint-disable-next-line no-console
			console.log(icon, 'race(...) script finished - aborting other scripts...')

			signal?.dispatchEvent(new Event('abort'))

			// process.kill(process.pid, 'SIGTERM')
			// eslint-disable-next-line es-x/no-promise-all-settled
			await Promise.allSettled(promises)
		}

		return
	}

	if (typeof script === 'function') {
		const result = await script(...args)
		if (result) await runScript(result, [], { signal })
		return
	}

	let tokens = [script, ...args].join(' ').split(' ')
	if (tokens[0] === 'v')
		tokens = tokens.slice(1)

		// eslint-disable-next-line no-param-reassign, sonarjs/no-unenclosed-multiline-block
	;[script, ...args] = tokens as [string, ...string[]]

	// console.log('script', script, script.length)

	// eslint-disable-next-line no-console
	console.log(icon, chalk.blueBright(script), chalk.gray(args.join(' ')))

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

	const stringScript = script

	// eslint-disable-next-line promise/avoid-new
	const cpPromise = new Promise<void>((resolve, reject) => {
		// console.log('spawn', script, ...args)
		// eslint-disable-next-line sonarjs/os-command
		const childProcess = spawn([script, ...args].join(' '), {
			shell: true,
			stdio: 'inherit',
		})

		const listener = (_event: Event) => {
			childProcess.kill('SIGTERM')
		}

		signal?.addEventListener('abort', listener, { once: true })

		childProcess.on('error', reject)

		childProcess.on('close', code => {
			signal?.removeEventListener('abort', listener)
			if (code)
				reject(
					new Error(
						`${icon} ${stringScript} ${args.join(
							' ',
						)} Non-zero exit code: ${code}`,
					),
				)
			else resolve()
		})
	})

	// cpPromises.push(cpPromise)

	await cpPromise

	// console.log('exec done')
}
