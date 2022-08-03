// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type PackageInfo = {
	name: string
	version?: string | undefined
}

function getPrefix(packageInfo?: PackageInfo | undefined) {
	if (!packageInfo) return null

	let prefix = packageInfo.name

	if (packageInfo.version) prefix = `${prefix}:${packageInfo.version}`

	return `[${prefix}]`
}

export class VoltisoError extends Error {
	constructor(
		message?: string | undefined,
		options?:
			| (ErrorOptions & { packageInfo?: PackageInfo | undefined })
			| undefined,
	) {
		// const packageJson = getPackageJsonCachedSync(dir)
		// const packageName = packageJson.name

		const parts: string[] = []

		const prefix = getPrefix(options?.packageInfo)

		if (prefix) parts.push(prefix)

		if (message) parts.push(message)

		const prefixedMessage = parts.join(' ')

		super(prefixedMessage, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'VoltisoError'
	}
}
