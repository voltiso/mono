// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathSegmentString, PathString } from '~/object'

export function basename(
	path: PathString<{ separator: '/' }>,
): PathSegmentString<{ separator: '/' }>

export function basename(path: string): PathSegmentString<{ separator: '/' }>

/**
 * Similar to `require('node:path').basename`
 *
 * - Does not detect Windows - only supports UNIX paths
 */
export function basename(path: string) {
	// eslint-disable-next-line no-param-reassign
	while (path.endsWith('/')) path = path.slice(0, -1)
	const lastIdx = path.lastIndexOf('/')
	return path.slice(lastIdx + 1)
}
