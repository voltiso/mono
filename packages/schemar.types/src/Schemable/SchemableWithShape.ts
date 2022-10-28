// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Array, $$InferableObject, $$InferableTuple } from '~'
import type { $$Object } from '~/custom-schemas/object'

export type SchemableWithShape =
	| $$Object
	| $$Array
	| $$InferableTuple
	| $$InferableObject
