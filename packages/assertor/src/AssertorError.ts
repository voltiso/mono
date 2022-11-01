// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationError } from '@voltiso/schemar'
import type { CallInfo } from '@voltiso/transform'
import { stringFromPackage } from '@voltiso/transform'
import { padStart, stringFrom } from '@voltiso/util'
import chalk from 'chalk'

export interface AssertorErrorOptions extends ErrorOptions {
	name: string
	value: unknown
	cause: ValidationError

	callInfo?: CallInfo | undefined
}

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

export class AssertorError extends Error {
	constructor(options: AssertorErrorOptions) {
		const { name, value, callInfo, ...otherOptions } = options

		const messageParts = ['⛔']

		const date = new Date()
		const dateStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${padStart(
			date.getMilliseconds().toString(),
			3,
			'0',
		)}`

		// const dateStr = /T(?<time>.*)/u.exec(date.toISOString())?.groups?.[
		// 	'time'
		// ] as string

		messageParts.push(chalk.gray(`[${dateStr}]`))

		if (callInfo?.location.package && callInfo.location.packagePath) {
			messageParts.push(
				chalk.gray(stringFromPackage(callInfo.location.package)),
				chalk.gray(callInfo.location.packagePath),
			)
		} else if (callInfo?.location.gitPath) {
			messageParts.push(chalk.gray(callInfo.location.gitPath))
		}

		if (callInfo?.expression && callInfo.expression !== name)
			throw new Error(
				'AssertorError internal: callInfo does not match expression name',
			)

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (callInfo?.expression && callInfo.arguments) {
			let str: string

			if (callInfo.arguments.length !== 1)
				throw new Error('expected 1 argument')

			const argumentStr = callInfo.arguments[0] as string

			if (callInfo.typeArguments.length > 0) {
				str = `${callInfo.expression}<${callInfo.typeArguments.join(
					', ',
				)}>(${argumentStr} 🟰 ${stringFrom(value)})`
			} else {
				str = `${callInfo.expression}(${argumentStr} 🟰 ${stringFrom(value)})`
			}

			messageParts.push(chalk.blue(str))
		}

		const message = messageParts.join(' ')

		super(message, otherOptions)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'AssertorError'

		if (this.stack) {
			this.stack = hackStack(this.stack)
		}
	}
}
