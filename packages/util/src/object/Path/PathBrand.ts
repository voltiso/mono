// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brand, CustomBrand, Override } from '~/type'

export interface PathOptions {
	/**
	 * Path separator
	 *
	 * @defaultValue `/`
	 */
	separator: string
}

export const defaultPathOptions = {
	separator: '/' as const,
}

export type DefaultPathOptions = typeof defaultPathOptions

//

declare module '~/Brands-augmentation' {
	interface Brands {
		path: {
			_: PathOptions
			segment: unknown
		}
	}
}

//

export type PathBrand<partialOptions extends Partial<PathOptions> = {}> =
	CustomBrand<'path._', Override<DefaultPathOptions, partialOptions>>

export type PathString<partialOptions extends Partial<PathOptions> = {}> =
	string & PathBrand<partialOptions>

//

/** Path segment is also a valid path */
export type PathSegmentBrand<partialOptions extends Partial<PathOptions> = {}> =
	PathBrand<partialOptions> & Brand<'path.segment'>

/** Does not include separator */
export type PathSegmentString<
	partialOptions extends Partial<PathOptions> = {},
> = string & PathSegmentBrand<partialOptions>

//

export function isPath<PartialOptions extends Partial<PathOptions> = {}>(
	str: string,
	_options?: PartialOptions,
): str is PathString<PartialOptions> {
	return str.length > 0
}

export function isPathSegment<PartialOptions extends Partial<PathOptions> = {}>(
	str: string,
	partialOptions?: PartialOptions,
): str is PathSegmentString<PartialOptions> {
	const options = { ...defaultPathOptions, ...partialOptions }
	return !str.includes(options.separator)
}
