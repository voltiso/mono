// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { basename } from 'node:path'

import { $assert } from '~/$strip'
import type { UndefinedFromOptional } from '~/object'

export type CodeLocation = UndefinedFromOptional<{
	path: string
	fileName: string
	line?: number
	column?: number
}>

export function getShortStackTracePath(path: string) {
	return (
		/^.*node_modules\/(?<shortPath>.*)$/u.exec(path)?.groups?.['shortPath'] ||
		/^.*\/(?<shortPath>[^/]*\/(?:dist|src)\/.*)$/u.exec(path)?.groups?.[
			'shortPath'
		] ||
		path
	)
}

export function decomposeStackTracePath(path: string) {
	return {
		path,
		shortPath: getShortStackTracePath(path),
		fileName: basename(path),
	}
}

export function tryParseCodeLocationWithLineAndColumn(
	locationStr: string,
): (CodeLocation & { line: number; column: number }) | undefined {
	const regex = /^(?<path>.*):(?<line>\d+):(?<column>\d+)$/u
	const { path, line, column } = regex.exec(locationStr)?.groups || {}
	if (!path) return undefined

	$assert.defined(line)
	$assert.defined(column)

	return {
		...decomposeStackTracePath(path),
		line: +line,
		column: +column,
	}
}

export function tryParseCodeLocationWithLine(
	locationStr: string,
): (CodeLocation & { line: number }) | undefined {
	const regex = /^(?<path>.*):(?<line>\d+)$/u
	const { path, line } = regex.exec(locationStr)?.groups || {}
	if (!path) return undefined

	$assert.defined(line)

	return {
		...decomposeStackTracePath(path),
		line: +line,
	}
}

export function tryParseCodeLocation(
	locationStr: string,
): CodeLocation | undefined {
	return (
		tryParseCodeLocationWithLineAndColumn(locationStr) ||
		tryParseCodeLocationWithLine(locationStr) || {
			path: locationStr,
			fileName: basename(locationStr),
		}
	)
}
