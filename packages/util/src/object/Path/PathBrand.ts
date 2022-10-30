// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brand, DetailedBrand, Override } from '~'

export type PathOptions = {
	/**
	 * Path separator
	 *
	 * @defaultValue `/`
	 */
	separator: string
}

export type DefaultPathOptions = {
	separator: '/'
}

//

declare module '~' {
	interface Brands {
		path: {
			segment: unknown
		}
	}
}

//

export type PathBrand<partialOptions extends Partial<PathOptions> = {}> =
	DetailedBrand<'path', Override<DefaultPathOptions, partialOptions>>

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
