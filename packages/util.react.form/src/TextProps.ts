// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationResult } from '@voltiso/schemar'
import type { ChangeEvent, RefObject } from 'react'

export type TextProps = {
	id?: string | undefined
	ref?:
		| undefined
		| null
		| RefObject<HTMLInputElement>
		| ((inst: HTMLInputElement) => void)
	value?: string | number | readonly string[] | undefined
	onChange?: undefined | ((e: ChangeEvent<HTMLInputElement>) => void)

	validationResult?: ValidationResult | undefined
}
