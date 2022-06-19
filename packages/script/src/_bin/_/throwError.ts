import { VoltisoScriptError } from '@voltiso/script.lib'
import chalk from 'chalk'

const packageName = '@voltiso/script'
const prefix = `[${packageName}]`

export function throwError(...messages: string[]): never {
	// eslint-disable-next-line no-console
	console.error(prefix, chalk.bgRed.bold.inverse(messages.join(' ')))

	throw new VoltisoScriptError([prefix, ...messages].join(' '))
}
