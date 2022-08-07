// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentProps, FC, ReactNode } from 'react'
import { useEffect, useLayoutEffect, useState } from 'react'

import { useCurrent, useInitial, useLocalStorage } from '~/hooks'

export type ScrollProps = {
	scrollRestorationKey?: string | undefined

	/**
	 * Specify how often should `scrollTop` be saved to `localStorage`
	 *
	 * - Requires setting the `scrollRestorationKey`
	 *
	 * @defaultValue `1000`
	 */
	saveScrollInterval?: number | undefined
	onSaveScroll?: ((y: number) => void) | undefined

	// Element?: keyof JSX.IntrinsicElements | undefined

	/**
	 * Auto-set `scrollBehavior: 'smooth'` after a delay (ms)
	 *
	 * @defaultValue `1000`
	 */
	setSmoothAfterDelay?: number | 'off' | undefined

	children?: ReactNode | undefined
	style?: React.CSSProperties | undefined
}

export type ValidScrollProps = ScrollProps &
	(
		| {
				scrollRestorationKey: string
				saveScrollInterval?: number | undefined
		  }
		| { saveScrollInterval?: undefined }
	)

function getLocationHref() {
	return typeof window !== 'undefined' ? window.location.href : undefined
}

const initialLocationHref = getLocationHref()
let historyChanged = false

function isNavigationBackForward() {
	if (historyChanged) return true

	const locationHref = getLocationHref()

	if (locationHref !== initialLocationHref) {
		historyChanged = true
		return true
	} else
		return (
			// eslint-disable-next-line etc/no-deprecated
			window.performance.navigation.type ===
			// eslint-disable-next-line etc/no-deprecated
			window.performance.navigation.TYPE_BACK_FORWARD
		)
}

export const Scroll: FC<ValidScrollProps & ComponentProps<'div'>> = props => {
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
			ref={instance => {
				mutable.element = instance
			}}
			style={{
				scrollBehavior,
				...otherProps.style,
			}}
		>
			{children}
		</div>
	)
}

Scroll.defaultProps = {
	saveScrollInterval: 1000,
	setSmoothAfterDelay: 1000,
}
