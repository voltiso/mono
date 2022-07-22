// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FormEvent, ReactNode, RefObject } from 'react'

export type FormProps = {
	ref?:
		| undefined
		| null
		| RefObject<HTMLFormElement>
		| ((inst: HTMLFormElement) => void)
	onSubmit?: undefined | ((event: FormEvent<HTMLFormElement>) => void)

	children?: ReactNode

	className?: string | undefined
}
