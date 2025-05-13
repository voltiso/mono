// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SchemarError } from '~/error'

export function throwTypeOnlyFieldError(): never {
	throw new SchemarError('Do not access `Out` at runtime (type-only field)')
}
