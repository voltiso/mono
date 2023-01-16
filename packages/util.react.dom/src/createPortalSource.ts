// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useUpdate } from '@voltiso/util.react'
import { useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

import { _createElement } from './_createElements'
import type { PortalContext } from './PortalContext'
import type { PortalSource } from './PortalSource'

export function createPortalSource(ctx: PortalContext): PortalSource {
	const Source: PortalSource = props => {
		const update = useUpdate()

		if (typeof window !== 'undefined')
			// eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
			useLayoutEffect(update, [])

		// if (!ctx.Element) {
		// 	ctx.Element = props.Element || 'div'
		// }

		// eslint-disable-next-line unicorn/no-negated-condition
		if (!ctx.areChildrenConsumed) {
			// console.log(
			// 	'Source: firstRenderChildren not consumed yet - do not create portal',
			// 	props,
			// )
			ctx.firstRenderChildren = props.children
			return null
		} else {
			// console.log('Source: portal children', props)

			// eslint-disable-next-line etc/no-internal
			if (!ctx.renderTarget) ctx.renderTarget = _createElement('div')

			if (ctx.renderTarget) {
				delete ctx.firstRenderChildren
				return createPortal(props.children, ctx.renderTarget)
			} else return null // server?
		}
	}

	return Source
}
