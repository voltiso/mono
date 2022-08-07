// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useUpdate } from '@voltiso/util.react'
import type { FC, ReactNode } from 'react'
import {
	createContext,
	useCallback,
	useContext,
	useLayoutEffect,
	useMemo,
} from 'react'
import * as ReactDOM from 'react-dom'

type PortalContext = {
	element?: HTMLElement | null
	children?: ReactNode
}

export const createPortal = () => {
	const Context = createContext<PortalContext>({})

	const Source: FC<{ children?: ReactNode }> = p => {
		// console.log('Source: render')

		if (typeof window !== 'undefined') {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const update = useUpdate()
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useLayoutEffect(() => {
				// console.log('Source: useLayoutEffect()')
				update()
			}, [update])
		}

		const context = useContext(Context)

		if (context.element) {
			delete context.children
			return ReactDOM.createPortal(p.children, context.element)
		} else {
			context.children = p.children
			return null
		}
	}

	const useDestination = () => {
		if (typeof window !== 'undefined') {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const update = useUpdate()
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useLayoutEffect(() => {
				// console.log('Destination: useLayoutEffect()')
				update()
			}, [update])
		}

		// if (!c.children && !c.element)
		// 	throw new Error('Portal: Destination must be after Source, and they both need to be inside `portal.Provider`')

		const context = useContext(Context)

		const ref = useCallback(
			(el: HTMLElement | null) => {
				// console.log('set ref')
				context.element = el
			},
			[context],
		)

		return useMemo(
			() => ({ ref, children: context.children }),
			[context.children, ref],
		)
	}

	const Destination: FC = () => {
		// console.log('Destination: render')
		const destination = useDestination()

		return <div ref={destination.ref}>{destination.children}</div>
	}

	return {
		Provider: Context.Provider,
		Source,
		Destination,
		useDestination,
	}
}
