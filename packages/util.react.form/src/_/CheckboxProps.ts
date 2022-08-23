// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationResult } from '@voltiso/schemar'
import type { ChangeEventHandler } from 'react'

export interface CheckboxProps {
	id?: string | undefined
	ref?: ((inst: HTMLInputElement | null) => void) | undefined | null
	checked?: boolean | undefined
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined

	validationResult?: ValidationResult | undefined
}
