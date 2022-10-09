// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocLike, DocTILike, DTI } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

export type FindDoc_<X> = X extends DocLike
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: // ? DocTypes[X] extends DocLike
	  // 	? DocTypes[X]
	  // 	: never
	  // : X extends { readonly [DTI]: DocTILike }
	  // ? FindDoc<X[DTI]['tag']>
	  never

export type FindDoc<
	X extends DocLike | DocTag | { readonly [DTI]: DocTILike },
> = FindDoc_<X>
