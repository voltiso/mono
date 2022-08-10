// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ChangeEvent, RefObject } from 'react'

import type * as s from './schemas/index'

export type TextProps = {
	id?: string | undefined
	ref?:
		| undefined
		| null
		| RefObject<HTMLInputElement>
		| ((inst: HTMLInputElement) => void)
	value?: string | number | readonly string[] | undefined
	onChange?: undefined | ((e: ChangeEvent<HTMLInputElement>) => void)

	validationResult?: s.ValidationResult | undefined
}
