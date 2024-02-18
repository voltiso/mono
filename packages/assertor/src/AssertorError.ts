// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationError } from '@voltiso/schemar'
import type { CallInfo } from '@voltiso/transform'
import { padStart, parseStackTrace, stringFrom, zip } from '@voltiso/util'
import chalk from 'chalk'

export function stringFromPackage(packageJson: {
	name: string
	version?: string | undefined
}): string {
	if (packageJson.version) {
		return `${packageJson.name}@${packageJson.version}`
	} else {
		return packageJson.name
	}
}

export interface AssertorErrorOptions extends ErrorOptions {
	name: string

	/** Additional message to include */
	message?: string | undefined

	arguments: unknown[]
	cause: ValidationError

	callInfo?: CallInfo | undefined
}

//

export function hackStack(stack: string): string {
	let lines = stack.split('\n')

	lines = lines.filter(line => {
		if (!line.includes('at ')) return true
		if (line.includes('assertor')) return false
		if (line.includes('callableObject')) return false
		return true
	})

	return lines.join('\n')
}

//

function getTimeStr(date: Date) {
	const h = padStart(date.getHours(), 2, '0')
	const m = padStart(date.getMinutes(), 2, '0')
	const s = padStart(date.getSeconds(), 2, '0')
	const ms = padStart(date.getMilliseconds(), 2, '0')

	return `${h}:${m}:${s}.${ms}`
}

//

export class AssertorError extends Error {
	constructor(options: AssertorErrorOptions) {
		const {
			name,
			// eslint-disable-next-line destructuring/no-rename
			message: providedMessage,
			// eslint-disable-next-line destructuring/no-rename
			arguments: args,
			callInfo,
			...otherOptions
		} = options

		let messageParts = []

		const dateStr = getTimeStr(new Date())
		messageParts.push(chalk.gray(`[${dateStr}]`))

		messageParts.push('⛔')

		if (callInfo?.expression && callInfo.expression !== name)
			throw new Error(
				'AssertorError internal: callInfo does not match expression name',
			)

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (callInfo?.expression && callInfo.arguments) {
			let str: string

			// if (callInfo.arguments.length !== 1)
			// 	throw new Error('expected 1 argument')

			// const argumentStr = callInfo.arguments[0] as string

			const argumentsStr = [...zip(callInfo.arguments, args)]
				.map(
					([str, value]) =>
						`${chalk.green(str)} 🟰  ${chalk.red(stringFrom(value))}`,
				)
				.join(', ')

			if (callInfo.typeArguments.length > 0) {
				str = `${chalk.yellow(
					callInfo.expression,
				)}<${callInfo.typeArguments.join(', ')}>(${argumentsStr})`
			} else {
				str = `${chalk.yellow(callInfo.expression)}(${argumentsStr})`
			}

			messageParts.push(chalk.blue(str))
		} else {
			const argumentsStr = args
				.map(arg => `${chalk.red(stringFrom(arg))}`)
				.join(', ')

			messageParts.push(`${name}(${argumentsStr})`)

			if (providedMessage) messageParts.push(providedMessage)
		}

		// LOCATION

		const locationParts = [] as string[]

		if (callInfo?.location.package && callInfo.location.packagePath) {
			locationParts.push(
				chalk.gray(stringFromPackage(callInfo.location.package)),
				chalk.gray(
					`${callInfo.location.packagePath}:${callInfo.location.line}:${callInfo.location.column}`,
				),
			)
		}

		if (callInfo?.location.gitPath) {
			locationParts.push(
				chalk.gray(
					`${callInfo.location.gitPath}:${callInfo.location.line}:${callInfo.location.column}`,
				),
			)
		}

		let haveLocation = false

		if (locationParts.length > 0) {
			haveLocation = true
			messageParts = [...messageParts, chalk.gray('@'), ...locationParts]
		}

		// FINALIZE

		const message = messageParts.join(' ')
		super(message, otherOptions)

		this.name = 'AssertorError'
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
		if (this.stack) this.stack = hackStack(this.stack)

		//

		if (!haveLocation && this.stack) {
			const parsedStack = parseStackTrace(this.stack)[0]
			if (parsedStack) {
				const locationStr = `${parsedStack.path as string}:${
					parsedStack.line as number
				}:${parsedStack.column as number}`

				this.message = `${this.message} ${chalk.gray('@')} ${chalk.gray(
					locationStr,
				)}`
			}
		}
	}
}
