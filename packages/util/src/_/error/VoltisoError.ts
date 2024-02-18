// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UndefinedFromOptional } from '~/object'

export namespace VoltisoError {
	export type PackageInfo = UndefinedFromOptional<{
		name: string
		version?: string
	}>

	export type FunctionInfo = UndefinedFromOptional<{
		name: string
		arguments?: unknown[]
	}>

	export type Options = ErrorOptions &
		UndefinedFromOptional<{
			package?: PackageInfo
			function?: FunctionInfo
		}>
}

// /** @internal */
// function _stringFromPackageInfo(info: VoltisoError.Package): string {
// 	return info.version ? `${info.name}@${info.version}` : info.name
// }

// /** @internal */
// function _stringFromFunctionInfo(info: VoltisoError.Function): string {
// 	if (!info.arguments) return `${info.name}(...)`

// 	const argumentsStr = info.arguments
// 		.map(argument => stringFrom(argument))
// 		.join(', ')

// 	return `${info.name}(${argumentsStr})`
// }

// /** @internal */
// function _getErrorMessagePrefix(options: VoltisoError.Options | undefined) {
// 	let prefix = ''

// 	if (options?.package) {
// 		// eslint-disable-next-line etc/no-internal
// 		const packageStr = _stringFromPackageInfo(options.package)
// 		prefix = `[${packageStr}]`
// 	}

// 	if (options?.function) {
// 		// eslint-disable-next-line etc/no-internal
// 		const functionStr = _stringFromFunctionInfo(options.function)
// 		prefix += ` ${functionStr}`
// 	}

// 	if (prefix) prefix += ' '

// 	return prefix
// }

export function parseVoltisoErrorConstructorArguments(
	arg0?:
		| string
		| (VoltisoError.Options & { message?: string | undefined })
		| undefined,
	arg1?: VoltisoError.Options | undefined,
): UndefinedFromOptional<{ message?: string; options?: VoltisoError.Options }> {
	if (typeof arg0 === 'object') {
		const { message, ...options } = arg0
		return { message, options }
	}

	if (typeof arg1 === 'object') {
		return { message: arg0, options: arg1 }
	}

	return { message: arg0 }
}

export class VoltisoError extends Error {
	package?: VoltisoError.PackageInfo
	function?: VoltisoError.FunctionInfo

	constructor(
		message?: string | undefined,
		options?: VoltisoError.Options | undefined,
	)

	constructor(
		options:
			| (VoltisoError.Options & { message?: string | undefined })
			| undefined,
	)

	constructor(
		arg0?:
			| string
			| (VoltisoError.Options & { message?: string | undefined })
			| undefined,
		arg1?: VoltisoError.Options | undefined,
	) {
		const { message, options } = parseVoltisoErrorConstructorArguments(
			arg0,
			arg1,
		)

		// // eslint-disable-next-line etc/no-internal
		// const prefix = _getErrorMessagePrefix(options)

		// const prefixedMessage = `${prefix}${message || ''}`

		super(message, options)
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
		this.name = 'VoltisoError'

		if (options?.package) this.package = options.package
		if (options?.function) this.function = options.function
	}
}
