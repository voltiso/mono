import {
	cleanCompatDirs,
	getCompatDirNames,
	readPackageJson,
	writeCompatDirs,
} from '@voltiso/script.lib'
import type { Command } from './Command'
import { throwError } from './throwError'

const subCommands = {
	get: async () => {
		const packageJson = await readPackageJson()
		const dirs = getCompatDirNames(packageJson)
		// eslint-disable-next-line no-console
		console.log(dirs.join(' '))
	},
	write: writeCompatDirs,
	clean: cleanCompatDirs,
}

type CommandName = keyof typeof subCommands

const subCommandNames = Object.keys(subCommands) as CommandName[]

function isMyCommandName(str: unknown): str is CommandName {
	if (typeof str !== 'string') return false
	return Object.keys(subCommands).includes(str)
}

/* eslint-disable func-style */
export const compatDirs: Command = async ({ commandArgs }) => {
	const [_commandName, ...rest] = commandArgs
	if (rest.length > 0) throwError('compatDirs expects at most 1 argument')
	const commandName = _commandName || 'get'

	if (!isMyCommandName(commandName)) {
		throwError(
			'compatDirs: unknown sub-command',
			commandName,
			'expected one of',
			subCommandNames.join(', ')
		)
	}

	const command = subCommands[commandName]

	return command()
}
