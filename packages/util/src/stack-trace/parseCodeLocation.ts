// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sonarjs/regular-expr */

import { $fastAssert } from '_'

import type { PathSegmentString } from '~/object'
import { basename } from '~/path'

import type { CodeLocation } from './CodeLocation'

/** @internal */

export type _hack_parseCodeLocation = PathSegmentString

export function getShortStackTracePath(path: string): string {
	return (
		/^.*node_modules\/(?<shortPath>.*)$/u.exec(path)?.groups?.['shortPath'] ??
		/^.*\/(?<shortPath>[^/]*\/(?:dist|src)\/.*)$/u.exec(path)?.groups?.[
			'shortPath'
		] ??
		path
	)
}

export interface DecomposeStackTracePathResult {
	path: string
	shortPath: string
	fileName: PathSegmentString<{ separator: '/' }>
}

export function decomposeStackTracePath(
	path: string,
): DecomposeStackTracePathResult {
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

	$fastAssert.defined(line)
	$fastAssert.defined(column)

	return {
		path,
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

	$fastAssert.defined(line)

	return {
		path,
		line: +line,
	}
}

export function tryParseCodeLocation(
	locationStr: string,
): CodeLocation | undefined {
	return (
		tryParseCodeLocationWithLineAndColumn(locationStr) ??
		tryParseCodeLocationWithLine(locationStr) ?? { path: locationStr }
	)
}
