// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as path from 'node:path'

import {
	cleanCompatDirs,
	getCompatDirNames,
	writeCompatDirs,
} from '~/compatDirs'
import { VoltisoScriptError } from '~/VoltisoScriptError'

import type { Command } from './Command'

const subCommands = {
	get: async () => {
		// eslint-disable-next-line import/dynamic-import-chunkname
		const utilNode = await import('@voltiso/util.node')
		const packageJson = await utilNode.getPackageJsonCached(path.resolve())
		const directories = getCompatDirNames(packageJson)
		// eslint-disable-next-line no-console
		console.log(directories.join(' '))
	},

	write: writeCompatDirs,
	clean: cleanCompatDirs,
}

type CommandName = keyof typeof subCommands

const subCommandNames = Object.keys(subCommands) as CommandName[]

// eslint-disable-next-line sonarjs/variable-name
function isMyCommandName(string_: unknown): string_ is CommandName {
	if (typeof string_ !== 'string') return false

	return Object.keys(subCommands).includes(string_)
}

export const compatDirs: Command = ({ commandArgs }) => {
	const [_commandName, ...rest] = commandArgs

	if (rest.length > 0)
		throw new VoltisoScriptError('compatDirs expects at most 1 argument')

	const commandName = _commandName ?? 'get'

	if (!isMyCommandName(commandName)) {
		const message = [
			'compatDirs: unknown sub-command',
			commandName,
			'expected one of',
			subCommandNames.join(', '),
		].join(' ')

		throw new VoltisoScriptError(message)
	}

	const command = subCommands[commandName]

	return command()
}
