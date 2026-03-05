// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as React from 'react'

/** @internal */
export function _createElement(
	elementType: keyof React.JSX.IntrinsicElements,
): HTMLElement | undefined {
	if (typeof document !== 'undefined')
		return document.createElement(elementType)
	else return undefined
}
