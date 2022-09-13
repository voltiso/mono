// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactNode } from 'react'

export type PortalContext = {
	// Element?: keyof JSX.IntrinsicElements
	renderTarget?: HTMLElement | undefined

	originalDestination?: HTMLElement
	destinationParent?: ParentNode

	firstRenderChildren?: ReactNode

	areChildrenConsumed?: boolean
}
