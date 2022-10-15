// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IterationOptions } from '~/object'
import { defaultIterationOptions } from '~/object'

export interface StringFromOptions extends IterationOptions {
	maxLength: number
}

const maxLength = Infinity
// const maxLength = 40 as const

export const defaultToStringOptions = {
	...defaultIterationOptions,
	maxLength,
}
