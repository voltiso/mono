// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathBrand } from '@voltiso/util'

import type { DocTag } from '~/DocTypes'

import type { DocBrand } from './DocBrand'

export interface DocPathBrand<tag extends DocTag> extends _DocPathBrand<tag> {}

export type _DocPathBrand<tag extends DocTag> = PathBrand<{ separator: '/' }> &
	DocBrand<tag>
