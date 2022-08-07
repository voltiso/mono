// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useUpdate } from '@voltiso/util.react'
import type { FC, ReactNode } from 'react'
import { useLayoutEffect, useMemo } from 'react'
import * as ReactDOM from 'react-dom'

type PortalContext = {
	Element?: keyof JSX.IntrinsicElements
	renderTarget?: HTMLElement | undefined

	originalDestination?: HTMLElement
	destinationParent?: ParentNode

	firstRenderChildren?: ReactNode

	areChildrenConsumed?: boolean

	// isPortalCreated?: boolean
	// isPortalConsumed?: boolean
}

function createElement(elementType: keyof JSX.IntrinsicElements) {
	if (typeof document !== 'undefined')
		return document.createElement(elementType)
	else return undefined
}

// type PortalOptions = {
// 	elementType: keyof JSX.IntrinsicElements
// }

function getSource(ctx: PortalContext) {
	const Source: FC<{
		children?: ReactNode
		Element?: keyof JSX.IntrinsicElements | undefined
	}> = props => {
		const update = useUpdate()

		if (typeof window !== 'undefined')
			// eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
			useLayoutEffect(update, [])

		if (!ctx.Element) {
			ctx.Element = props.Element || 'div'
		}

		if (!ctx.areChildrenConsumed) {
			// console.log(
			// 	'Source: firstRenderChildren not consumed yet - do not create portal',
			// 	props,
			// )
			ctx.firstRenderChildren = props.children
			return null
		} else {
			// console.log('Source: portal children', props)

			if (!ctx.renderTarget) ctx.renderTarget = createElement(ctx.Element)

			if (ctx.renderTarget) {
				delete ctx.firstRenderChildren
				return ReactDOM.createPortal(props.children, ctx.renderTarget)
			} else return null // server?
		}
	}

	return Source
}

function getDestination(ctx: PortalContext) {
	const Destination: FC<Record<string, never>> = () => {
		const update = useUpdate()

		if (typeof window !== 'undefined')
			// eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
			useLayoutEffect(update, [])

		const RelaxedElementType = ctx.Element as 'div' | 'span' // for TS not to complain

		if (!ctx.renderTarget) {
			const children = ctx.firstRenderChildren
			// console.log('Destination: no portal yet', children)
			// delete ctx.firstRenderChildren

			ctx.areChildrenConsumed = true
			return <RelaxedElementType>{children}</RelaxedElementType>
		} else {
			// console.log('Destination: have portal')

			return (
				<RelaxedElementType
					ref={destination => {
						// console.log('setRef', destination)

						if (destination) {
							// console.log('mount')

							ctx.originalDestination = destination
							ctx.destinationParent = destination.parentNode!

							ctx.destinationParent.replaceChild(ctx.renderTarget!, destination)
						} else {
							// console.log('unmount')

							ctx.destinationParent!.replaceChild(
								ctx.originalDestination!,
								ctx.renderTarget!,
							)
						}
					}}
				/>
			)
		}
	}
	return Destination
}

export function usePortal() {
	// console.log('parent: render')

	const ctx = useMemo<PortalContext>(() => ({}), [])
	const Source = useMemo(() => getSource(ctx), [ctx])
	const Destination = useMemo(() => getDestination(ctx), [ctx])

	return useMemo(
		() => ({
			Source,
			Destination,
		}),
		[Destination, Source],
	)
}
