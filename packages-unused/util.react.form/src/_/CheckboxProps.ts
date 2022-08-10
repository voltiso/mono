// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ChangeEventHandler } from 'react'

import type { ValidationResult } from '~/schemas/validationResult'

export interface CheckboxProps {
	id?: string | undefined
	ref?: ((inst: HTMLInputElement | null) => void) | undefined | null
	checked?: boolean | undefined
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined

	validationResult?: ValidationResult | undefined
}
