#!/usr/bin/env node

// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { register as registerEsbuild } from 'esbuild-register/dist/node'
import { registerCleanup } from '../_/cleanup'
import { context } from '../_/context'
import { runScript } from '../runScript'
// import type { EventListener } from 'node'
import { VoltisoScriptError } from '../VoltisoScriptError'
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

// console.log(icon, pc.gray('@voltiso/script'))

// const cpPromises = [] as Promise<void>[]

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

	const controller = new AbortController()
	const signal = controller.signal
	context.signal = signal

	registerCleanup(async () => {
		try {
			// console.log('cleanup: controller.abort()')
			controller.abort()
		} catch {
			// console.log('cleanup: controller.abort() throwed')
		}
	})

	await runScript(commandName, commandArgs, { signal })

	// console.log('main END')
}

void main()
