// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoScriptError } from '@voltiso/script.lib'

import { compatDirs } from './_/compatDirs.js'

const commands = {
	compatDirs,
}

type CommandName = keyof typeof commands

function isCommandName(string_: unknown): string_ is CommandName {
	if (typeof string_ !== 'string') return false

	return Object.keys(commands).includes(string_ as CommandName)
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

	const [commandName, ...commandArgs] = args

	if (isCommandName(commandName)) {
		// eslint-disable-next-line security/detect-object-injection
		const command = commands[commandName]
		return command({ commandArgs })
	}

	// const scripts = await getScripts(process.cwd)

	let messages = ['Supported commands:', commandNamesStr]

	if (commandName) messages = [...messages, 'got', commandName]

	throw new VoltisoScriptError(messages.join(' '))
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void main()
