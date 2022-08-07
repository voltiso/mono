// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useUpdate } from '@voltiso/util.react'
import type { FC, ReactNode } from 'react'
import { useCallback, useLayoutEffect, useMemo } from 'react'
import * as ReactDOM from 'react-dom'

type PortalContext = {
	element?: HTMLElement | null
	children?: ReactNode
	updateSource?: () => void
}

function getUseDestination(context: PortalContext) {
	return () => {
		if (typeof window !== 'undefined') {
			const update = useUpdate()
			useLayoutEffect(() => {
				// console.log('Destination: useLayoutEffect()')
				update()
			}, [update])
		}

		// if (!c.children && !c.element)
		// 	throw new Error('Portal: Destination must be after Source, and they both need to be inside `portal.Provider`')

		const ref = useCallback((instance: HTMLElement | null) => {
			// console.log('set ref')
			context.element = instance

			if (context.updateSource) context.updateSource()
		}, [])

		return useMemo(() => ({ ref, children: context.children }), [ref])
	}
}

export function usePortal() {
	const context = useMemo<PortalContext>(() => ({}), [])

	const Source = useCallback<FC<{ children?: ReactNode }>>(
		props => {
			// console.log('Source: render')

			if (typeof window !== 'undefined') {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const update = useUpdate()
				context.updateSource = update
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useLayoutEffect(() => {
					// console.log('Source: useLayoutEffect()')
					update()
				}, [update])
			}

			if (context.element) {
				delete context.children
				return ReactDOM.createPortal(props.children, context.element)
			} else {
				context.children = props.children
				return null
			}
		},
		[context],
	)

	const useDestination = useMemo(() => getUseDestination(context), [context])

	const Destination: FC = () => {
		// console.log('Destination: render')
		const destination = useDestination()

		return <div ref={destination.ref}>{destination.children}</div>
	}

	return {
		Source,
		Destination,
		useDestination,
	}
}
