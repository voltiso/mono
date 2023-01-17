#!/usr/bin/env node

// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line n/shebang
import { spawn } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import type { Script } from '@voltiso/script.lib'
import { VoltisoScriptError } from '@voltiso/script.lib'
import { registerEsbuild } from '@voltiso/util.esbuild'
import chalk from 'chalk'

import { compatDirs } from './_/compatDirs'

registerEsbuild()

const commands = {
	compatDirs,
}

type CommandName = keyof typeof commands

function isCommandName(string_: unknown): string_ is CommandName {
	if (typeof string_ !== 'string') return false

	return Object.keys(commands).includes(string_ as CommandName)
}

let gScripts: Record<string, string | string[]> | undefined

function getScripts(): Record<string, string | string[]> {
	// console.log('getScripts')

	if (!gScripts) {
		let currentCwd = path.resolve(process.cwd())

		let scripts: Record<string, string | string[]> = {}

		while (currentCwd) {
			const scriptsFilePath = path.join(currentCwd, 'scripts')

			try {
				// eslint-disable-next-line import/no-dynamic-require, n/global-require, unicorn/prefer-module
				const moreScripts = require(scriptsFilePath) as Record<string, string>
				scripts = { ...moreScripts, ...scripts }
			} catch (error) {
				if (
					(error as { code: string } | null)?.code !== 'MODULE_NOT_FOUND' ||
					!(error as { message?: string } | null)?.message?.includes(
						`Cannot find module '${scriptsFilePath}'`,
					)
				)
					throw error
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

async function getPackageScripts() {
	// console.log('getPackageScripts')

	if (!gPackageScripts) {
		const packageJsonPath = path.join(process.cwd(), 'package.json')

		// eslint-disable-next-line security/detect-non-literal-fs-filename
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

// // eslint-disable-next-line no-console
// console.log(icon, chalk.gray('@voltiso/script'))

async function runScript(script: Script | Promise<Script>, ...args: string[]) {
	// eslint-disable-next-line require-atomic-updates, no-param-reassign
	script = await script

	if (Array.isArray(script)) {
		const subScripts = await Promise.all(script)

		for (const s of subScripts) {
			// eslint-disable-next-line no-await-in-loop
			await runScript(s, ...args)
		}
		return
	}

	if (typeof script === 'function') {
		const result = await script(...args)
		if (result) await runScript(result)
		return
	}

	let tokens = [script, ...args].join(' ').split(' ')
	if (tokens[0] === 'v')
		tokens = tokens.slice(1)

		// eslint-disable-next-line no-param-reassign
	;[script, ...args] = tokens as [string, ...string[]]

	// eslint-disable-next-line no-console
	console.log(icon, chalk.blueBright(script), chalk.gray(args.join(' ')))

	const packageScripts = await getPackageScripts()
	const scripts = getScripts()

	const packageScript = packageScripts[script]

	if (packageScript && packageScript !== script) {
		await runScript(packageScript, ...args)
		return
	}

	const codeScript = scripts[script]

	if (codeScript) {
		await runScript(codeScript, ...args)
		return
	}

	const stringScript = script

	// eslint-disable-next-line promise/avoid-new
	await new Promise<void>((resolve, reject) => {
		// console.log('spawn', script, ...args)
		const childProcess = spawn([script, ...args].join(' '), {
			shell: true,
			stdio: 'inherit',
		})

		childProcess.on('error', reject)
		childProcess.on('close', code => {
			if (code)
				reject(
					new Error(
						`[@voltiso/script] ${stringScript} ${args.join(
							' ',
						)} Non-zero exit code: ${code}`,
					),
				)
			else resolve()
		})
	})

	// console.log('exec done')
}

async function main(): Promise<void> {
	const args = process.argv.slice(2)

	const commandNames = Object.keys(commands) as CommandName[]
	const commandNamesStr = commandNames.join(', ')

	if (args.length === 0) {
		const message = [
			'Expected at least 1 argument - command name - one of',
			commandNamesStr,
			'or script name',
		].join(' ')

		throw new VoltisoScriptError(message)
	}

	const [commandName, ...commandArgs] = args as [string, ...string[]]

	if (isCommandName(commandName)) {
		const command = commands[commandName]
		await command({ commandArgs })
		return
	}

	await runScript(commandName, ...commandArgs)

	// let messages = ['Supported commands:', commandNamesStr]

	// if (commandName) messages = [...messages, 'got', commandName]

	// throw new VoltisoScriptError(messages.join(' '))
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void main()
