/* eslint-disable max-statements */
import { throwError } from './_/throwError'
import { compatDirs } from './_/compatDirs'
import { install } from './_/install'

const commands = {
	compatDirs,
	install,
}

type CommandName = keyof typeof commands

function isCommandName(str: unknown): str is CommandName {
	if (typeof str !== 'string') return false
	return Object.keys(commands).includes(str as CommandName)
}

async function main(): Promise<void> {
	// eslint-disable-next-line no-magic-numbers
	const args = process.argv.slice(2)

	const commandNames = Object.keys(commands) as CommandName[]
	const commandNamesStr = commandNames.join(', ')

	if (args.length < 1) {
		throwError(
			'Expected at least 1 argument - command name - one of',
			commandNamesStr
		)
	}

	const [commandName, ...commandArgs] = args

	if (!isCommandName(commandName)) {
		let messages = ['Supported commands:', commandNamesStr]
		if (commandName) messages = [...messages, 'got', commandName]
		throwError(...messages)
	}

	const command = commands[commandName]

	return command({ commandArgs })
}

void main()
