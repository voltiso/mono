// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Doc, $$DocTI, DTI } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

export type FindDoc_<X> = X extends $$Doc
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: // ? DocTypes[X] extends DocLike
	  // 	? DocTypes[X]
	  // 	: never
	  // : X extends { readonly [DTI]: DocTILike }
	  // ? FindDoc<X[DTI]['tag']>
	  never

export type FindDoc<X extends $$Doc | DocTag | { readonly [DTI]: $$DocTI }> =
	FindDoc_<X>
