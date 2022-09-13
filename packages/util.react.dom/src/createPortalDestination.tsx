// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { useUpdate } from '@voltiso/util.react'
import { useLayoutEffect } from 'react'

import type { PortalContext } from './PortalContext'
import type { PortalDestination } from './PortalDestination'

export function createPortalDestination(ctx: PortalContext): PortalDestination {
	const Destination: PortalDestination = () => {
		const update = useUpdate()

		if (typeof window !== 'undefined')
			// eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
			useLayoutEffect(update, [])

		// const Element = ctx.Element as 'div' | 'span' // for TS not to complain

		const Element = 'div'

		if (!ctx.renderTarget) {
			const children = ctx.firstRenderChildren
			// console.log('Destination: no portal yet', children)
			// delete ctx.firstRenderChildren

			ctx.areChildrenConsumed = true
			return <Element>{children}</Element>
		} else {
			// console.log('Destination: have portal')

			return (
				<Element
					ref={destination => {
						// console.log('setRef', destination)

						if (destination) {
							// console.log('mount')

							$assert(destination.parentNode)

							ctx.originalDestination = destination
							ctx.destinationParent = destination.parentNode

							$assert(ctx.renderTarget)

							ctx.destinationParent.replaceChild(ctx.renderTarget, destination)
						} else {
							// console.log('unmount')
							$assert(ctx.destinationParent)
							$assert(ctx.originalDestination)
							$assert(ctx.renderTarget)

							ctx.destinationParent.replaceChild(
								ctx.originalDestination,
								ctx.renderTarget,
							)
						}
					}}
				/>
			)
		}
	}
	return Destination
}
