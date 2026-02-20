// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import type { nullish } from '@voltiso/util'
import { overrideDefined } from '@voltiso/util'
import type { ComponentProps, ForwardRefRenderFunction } from 'react'
import {
	createContext,
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

export interface ScrollContextValue {
	onScrollRestore?: ((scrollTop: number) => void) | nullish
}

export const ScrollContext = createContext<ScrollContextValue>(null as never)

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
	} = overrideDefined(defaultScrollProps, props)

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

	const scrollContextValue = useMemo<ScrollContextValue>(() => ({}), [])

	if (typeof window !== 'undefined') {
		// biome-ignore lint/correctness/useHookAtTopLevel: .
		const scrollTargetElement = useMemo(
			() => (scrollTarget ? document.querySelector(scrollTarget) : null),
			[scrollTarget],
		)

		// biome-ignore lint/correctness/useExhaustiveDependencies: .
		// biome-ignore lint/correctness/useHookAtTopLevel: .
		useLayoutEffect(() => {
			if (!isNavigationBackForward({ pathname })) return undefined
			if (!current.scrollRestoration) return undefined

			const top = current.scrollRestoration.scrollTop

			const run = () => {
				const element = scrollTargetElement || mutable.element
				element?.scroll({ top })

				if (scrollContextValue.onScrollRestore)
					scrollContextValue.onScrollRestore(top)
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
			scrollContextValue,
			scrollRestorationDelay,
			scrollRestorationKey,
			scrollTargetElement,
		])

		//

		/** Save scroll position periodically */
		// biome-ignore lint/correctness/useHookAtTopLevel: .
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

		const timeout = setTimeout(() => {
			setScrollBehavior('smooth')
		}, setSmoothAfterDelay)

		return () => {
			clearTimeout(timeout)
		}
	}, [setSmoothAfterDelay])

	//

	// $AssumeType<'div'>(as)
	const Component = as as 'div'

	// render
	return (
		<ScrollContext.Provider value={scrollContextValue}>
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
		</ScrollContext.Provider>
	)
}

ScrollRenderFunction.displayName = 'Scroll'

export const Scroll = forwardRef(ScrollRenderFunction)
