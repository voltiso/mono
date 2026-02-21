import * as path from 'node:path'

/**
 * Generates a new PATH string with all parent node_modules/.bin directories prepended.
 * * @param cwd The starting directory (defaults to process.cwd())
 * @param currentPath The existing PATH string (defaults to process.env.PATH)
 * @returns The augmented PATH string
 */
export function getAugmentedPath(
	cwd: string = process.cwd(),
	currentPath: string | undefined = process.env['PATH'],
): string {
	const binPaths: string[] = []
	let currentDir = cwd

	// Walk up the directory tree to the root
	while (true) {
		binPaths.push(path.join(currentDir, 'node_modules', '.bin'))

		const parentDir = path.dirname(currentDir)
		if (parentDir === currentDir) {
			break // We've reached the root directory (e.g., '/' or 'C:\')
		}
		currentDir = parentDir
	}

	// Combine the new bin paths with the existing PATH using the OS-specific delimiter
	const pathArray = currentPath ? [...binPaths, currentPath] : binPaths
	return pathArray.join(path.delimiter)
}
