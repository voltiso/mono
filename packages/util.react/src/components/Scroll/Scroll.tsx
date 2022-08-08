// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentProps, ForwardRefRenderFunction } from 'react'
import { forwardRef, useEffect, useLayoutEffect, useState } from 'react'

import { useCurrent, useInitial, useLocalStorage } from '~/hooks'
import { refs } from '~/refs'

import { isNavigationBackForward } from './isNavigationBackForward'
import type { ValidScrollProps } from './ScrollProps'

const ScrollRenderFunction: ForwardRefRenderFunction<
	HTMLDivElement,
	ValidScrollProps & ComponentProps<'div'>
> = (props, ref) => {
	const { children, scrollRestorationKey, onSaveScroll, ...otherProps } = props

	const [scrollBehavior, setScrollBehavior] = useState<'smooth' | undefined>()

	const mutable = useInitial({ element: null as HTMLDivElement | null })

	const localStorageKey =
		scrollRestorationKey &&
		`@voltiso/util.react.Scroll(${scrollRestorationKey})`

	const [scrollRestoration, setScrollRestoration] = useLocalStorage<{
		lastSeenAt: string | undefined
		scrollTop: number | undefined
	}>(localStorageKey, { lastSeenAt: undefined, scrollTop: undefined })

	const current = useCurrent({ scrollRestoration, onSaveScroll })

	if (typeof window !== 'undefined')
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useLayoutEffect(() => {
			if (!isNavigationBackForward()) return

			if (!current.scrollRestoration?.scrollTop) return

			mutable.element?.scroll({ top: current.scrollRestoration.scrollTop })
		}, [current, mutable, scrollRestorationKey])

	//

	// save scroll position periodically
	useEffect(() => {
		if (scrollRestorationKey === undefined) return undefined

		const interval = setInterval(() => {
			if (
				mutable.element &&
				scrollRestoration &&
				scrollRestoration.scrollTop !== mutable.element.scrollTop
			) {
				if (current.onSaveScroll)
					current.onSaveScroll(mutable.element.scrollTop)

				setScrollRestoration({
					lastSeenAt: new Date().toISOString(),
					scrollTop: mutable.element.scrollTop,
				})
			}
		}, props.saveScrollInterval)

		return () => {
			clearInterval(interval)
		}
	}, [
		current,
		mutable,
		props.saveScrollInterval,
		scrollRestoration,
		scrollRestorationKey,
		setScrollRestoration,
	])

	//

	// enable smooth scrolling only after initial page scroll is done (e.g. scroll-to-hash)
	useEffect(() => {
		if (typeof props.setSmoothAfterDelay !== 'number') return undefined

		const timeout = setTimeout(
			() => setScrollBehavior('smooth'),
			props.setSmoothAfterDelay,
		)
		return () => clearTimeout(timeout)
	}, [props.setSmoothAfterDelay])

	//

	// render
	return (
		<div
			{...otherProps}
			ref={refs(ref, instance => {
				mutable.element = instance
			})}
			style={{
				scrollBehavior,
				...otherProps.style,
			}}
		>
			{children}
		</div>
	)
}

ScrollRenderFunction.displayName = 'Scroll.render'

export const Scroll = forwardRef(ScrollRenderFunction)

Scroll.defaultProps = {
	saveScrollInterval: 1000,
	setSmoothAfterDelay: 1000,
}
