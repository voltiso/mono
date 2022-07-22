// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useConst, useUpdate } from '@voltiso/util.react'
import type { FC, ReactNode } from 'react'
import { createContext, useCallback, useContext, useLayoutEffect } from 'react'
import { createPortal as createPortal_ } from 'react-dom'

type C = {
	element?: HTMLElement | null
	children?: ReactNode
}

export const createPortal = () => {
	const Context = createContext<C>({})

	const Root: FC<{ children: ReactNode }> = p => {
		const r = useConst<C>({})
		// const value = useMemo(() => ({ children, setElement }), [])
		return <Context.Provider value={r}>{p.children}</Context.Provider>
	}

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

		const c = useContext(Context)

		if (c.element) {
			delete c.children
			return createPortal_(p.children, c.element)
		} else {
			c.children = p.children
			return null
		}
	}

	const Destination: FC = () => {
		// console.log('Destination: render')

		if (typeof window !== 'undefined') {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const update = useUpdate()
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useLayoutEffect(() => {
				// console.log('Destination: useLayoutEffect()')
				update()
			}, [update])
		}

		const c = useContext(Context)

		// if (!c.children && !c.element)
		// 	throw new Error('Portal: Destination must be after Source, and they both need to be inside Root')

		const ref = useCallback(
			(el: HTMLElement | null) => {
				// console.log('set ref')
				c.element = el
			},
			[c],
		)
		return <div ref={ref}>{c.children}</div>
	}

	return { Root, Source, Destination }
}
