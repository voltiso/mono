// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { useUpdate } from '@voltiso/util.react'
import { useLayoutEffect } from 'react'

import { _createElement } from './_createElements'
import type { PortalContext } from './PortalContext'
import type { PortalDestination } from './PortalDestination'

export function createPortalDestination(ctx: PortalContext): PortalDestination {
	const Destination: PortalDestination = () => {
		const update = useUpdate()

		if (typeof window !== 'undefined')
			// eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps, sonarjs/rules-of-hooks
			useLayoutEffect(update, [])

		// const Element = ctx.Element as 'div' | 'span' // for TS not to complain

		// eslint-disable-next-line no-useless-assignment
		const Element = 'div'

		if (!ctx.renderTarget) ctx.renderTarget = _createElement('div')
		ctx.areChildrenConsumed = true

		if (ctx.firstRenderChildren || !ctx.renderTarget) {
			// console.log('Destination: no portal yet', ctx.firstRenderChildren)
			return <Element>{ctx.firstRenderChildren}</Element>
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
