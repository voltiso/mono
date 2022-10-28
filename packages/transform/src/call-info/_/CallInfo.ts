// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface CallInfo {
	expression: string
	arguments: string[]
	typeArguments: string[]

	location: {
		package?:
			| {
					name: string
					version?: string | undefined
			  }
			| undefined

		packagePath?: string | undefined
		gitPath?: string | undefined

		position: number
		line: number
		column: number

		astPath: string[]
	}
}

export function isCallInfo(x: unknown): x is CallInfo {
	const callInfo = x as CallInfo | null
	return !!callInfo && !!callInfo.expression && !!callInfo.location
}

//

export function stringFromPackage(packageJson: {
	name: string
	version?: string | undefined
}): string {
	if (!packageJson.version) return packageJson.name
	else return `${packageJson.name}@${packageJson.version}`
}

// export function getPhysicalPath(callInfo: CallInfo): string {
// 	return `${stringFromPackage(callInfo.location.package)}${callInfo.location.packagePath}:${}`
// }

// export function getLogicalPath(callInfo: CallInfo): string {
// 	return `${stringFromPackage(callInfo.location.package)}`
// }
