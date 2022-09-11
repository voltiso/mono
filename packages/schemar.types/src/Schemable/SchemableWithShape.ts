// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ArrayLike, InferableObjectLike, InferableTupleLike } from '~'
import type { ObjectLike } from '~/custom-schemas/object'

export type SchemableWithShape =
	| ObjectLike
	| ArrayLike
	| InferableTupleLike
	| InferableObjectLike
