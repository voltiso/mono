// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

/* eslint-disable react/forbid-component-props */

import type { ComponentProps, ForwardRefRenderFunction } from 'react'
import {
	forwardRef,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react'

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
		as,
		scrollTarget,
		pathname,
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
		// lastSeenAt: number
		scrollTop: number
	}>(localStorageKey, {
		// lastSeenAt: 0,
		scrollTop: 0,
	})

	const current = useCurrent({ scrollRestoration, onSaveScroll })

	if (typeof window !== 'undefined') {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const scrollTargetElement = useMemo(
			() => (scrollTarget ? document.querySelector(scrollTarget) : null),
			[scrollTarget],
		)

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useLayoutEffect(() => {
			if (!isNavigationBackForward({ pathname })) return undefined
			if (!current.scrollRestoration) return undefined

			const top = current.scrollRestoration.scrollTop

			const run = () => {
				const element = scrollTargetElement || mutable.element
				element?.scroll({ top })
			}

			if (scrollRestorationDelay) {
				const timeout = setTimeout(run, scrollRestorationDelay)

				return () => {
					clearTimeout(timeout)
				}
			} else {
				run()
				return undefined
			}
		}, [
			current,
			mutable,
			pathname,
			scrollRestorationDelay,
			scrollRestorationKey,
			scrollTargetElement,
		])

		//

		/** Save scroll position periodically */
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			if (scrollRestorationKey === undefined) return undefined

			const interval = setInterval(() => {
				const element = scrollTargetElement || mutable.element

				if (
					element &&
					scrollRestoration &&
					scrollRestoration.scrollTop !== element.scrollTop
				) {
					if (current.onSaveScroll) current.onSaveScroll(element.scrollTop)

					setScrollRestoration({
						// lastSeenAt: Date.now(),
						scrollTop: element.scrollTop,
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
			scrollTargetElement,
			setScrollRestoration,
		])
	}

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

	// $AssumeType<'div'>(as)
	const Component = as as 'div'

	// render
	return (
		<Component
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
		</Component>
	)
}

ScrollRenderFunction.displayName = 'Scroll'

export const Scroll = forwardRef(ScrollRenderFunction)

Scroll.defaultProps = defaultScrollProps
