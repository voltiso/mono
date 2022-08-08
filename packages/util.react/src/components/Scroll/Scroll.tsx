// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentProps, ForwardRefRenderFunction } from 'react'
import { forwardRef, useEffect, useLayoutEffect, useState } from 'react'

import { useCurrent, useInitial, useLocalStorage } from '~/hooks'
import { refs } from '~/refs'

import { isNavigationBackForward } from './isNavigationBackForward'
import type { ScrollProps, ValidScrollProps } from './ScrollProps'

const ScrollRenderFunction: ForwardRefRenderFunction<
	HTMLDivElement,
	ValidScrollProps & ComponentProps<'div'>
> = (props, ref) => {
	const {
		children,
		scrollRestorationKey,
		onSaveScroll,
		saveScrollInterval,
		setSmoothAfterDelay,
		style,
		...otherProps
	} = props as ScrollProps

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
		}, saveScrollInterval)

		return () => {
			clearInterval(interval)
		}
	}, [
		current,
		mutable,
		saveScrollInterval,
		scrollRestoration,
		scrollRestorationKey,
		setScrollRestoration,
	])

	//

	// enable smooth scrolling only after initial page scroll is done (e.g. scroll-to-hash)
	useEffect(() => {
		if (typeof setSmoothAfterDelay !== 'number') return undefined

		const timeout = setTimeout(
			() => setScrollBehavior('smooth'),
			setSmoothAfterDelay,
		)
		return () => clearTimeout(timeout)
	}, [setSmoothAfterDelay])

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
				...style,
			}}
		>
			{children}
		</div>
	)
}

ScrollRenderFunction.displayName = 'Scroll.render'

export const Scroll = forwardRef(ScrollRenderFunction)

Scroll.defaultProps = {
	saveScrollInterval: 1_000,
	setSmoothAfterDelay: 1_000,
}
