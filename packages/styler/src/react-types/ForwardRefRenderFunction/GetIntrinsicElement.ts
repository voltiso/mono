// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type React from 'react'

import type { NativeElement } from '~/StyledComponent'

/** Slow and not perfect - avoid conversion this way (native to intrinsic) */
export type GetIntrinsicElement<T extends NativeElement> = {
	[k in keyof React.JSX.IntrinsicElements]: Exclude<
		Extract<
			React.JSX.IntrinsicElements[k]['ref'],
			React.RefObject<unknown>
		>['current'],
		null
	> extends T
		? k
		: never
}[keyof React.JSX.IntrinsicElements]
