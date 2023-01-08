// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RefObject } from 'react'

import type { NativeElement } from '~/StyledComponent'

/** Slow and not perfect - avoid conversion this way (native to intrinsic) */
export type GetIntrinsicElement<T extends NativeElement> = {
	[k in keyof JSX.IntrinsicElements]: Exclude<
		Extract<JSX.IntrinsicElements[k]['ref'], RefObject<unknown>>['current'],
		null
	> extends T
		? k
		: never
}[keyof JSX.IntrinsicElements]
