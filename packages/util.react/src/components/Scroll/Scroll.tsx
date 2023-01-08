// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentProps, ForwardRefRenderFunction } from 'react'
import { forwardRef, useEffect, useState } from 'react'

import { useCurrent, useInitial, useLocalStorage } from '~/hooks'
import { refs } from '~/refs'

import { isNavigationBackForward } from './isNavigationBackForward'
import type { ScrollProps } from './ScrollProps'
import { defaultScrollProps } from './ScrollProps'

const ScrollRenderFunction: ForwardRefRenderFunction<
	HTMLDivElement,
	ScrollProps & ComponentProps<'div'>
> = (props, ref) => {
	const {
		children,
		scrollRestorationKey,
		scrollRestorationDelay,
		onSaveScroll,
		saveScrollInterval,
		setSmoothAfterDelay,
		style,
		...otherProps
	} = props

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

	if (typeof window !== 'undefined') {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (!isNavigationBackForward()) return undefined

			const top = current.scrollRestoration?.scrollTop

			if (!top) return undefined

			const timeout = setTimeout(() => {
				mutable.element?.scroll({ top })
			}, scrollRestorationDelay)

			return () => {
				clearTimeout(timeout)
			}
		}, [current, mutable, scrollRestorationDelay, scrollRestorationKey])
	}

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

ScrollRenderFunction.displayName = 'Scroll'

export const Scroll = forwardRef(ScrollRenderFunction)

Scroll.defaultProps = defaultScrollProps
