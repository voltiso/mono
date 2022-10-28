/**
 * Similar to `require('node:path').basename`
 *
 * - Does not detect Windows - only supports UNIX paths
 */
export function basename(path: string) {
	while (path.endsWith('/')) path = path.slice(0, -1)
	const lastIdx = path.lastIndexOf('/')
	return path.slice(lastIdx + 1)
}
