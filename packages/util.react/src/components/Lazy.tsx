// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ComponentPropsWithRef,
	CSSProperties,
	ForwardRefRenderFunction,
	ReactNode,
} from 'react'
import { forwardRef, Suspense, useState } from 'react'

import { Lifecycle } from '~/components'
import { useInitial, useLazyLoad, useRestoreHeight, useSsrFix } from '~/hooks'
import { refs } from '~/refs'

const LazyRender: ForwardRefRenderFunction<
	HTMLDivElement,
	ComponentPropsWithRef<'div'> & {
		readonly storageKey?: string | undefined

		readonly children: ReactNode
		readonly style?: CSSProperties | undefined
	}
> = (props, ref) => {
	const { children, storageKey, style, ...otherProps } = props

	const finalStorageKey = storageKey
		? `@voltiso/util.react.Lazy(${storageKey})`
		: undefined

	const lazy = useLazyLoad()
	const restoreHeight = useRestoreHeight(finalStorageKey)

	const mutable = useInitial({
		restoredHeight: restoreHeight.height,
	})

	const [isLoaded, setIsLoaded] = useState(false)

	// make SSR work (first render should not use LocalStorage)
	const ssrFix = useSsrFix()

	const height = mutable.restoredHeight
		? `${mutable.restoredHeight}px`
		: undefined

	// console.log('lazy.show', lazy.show)
	// console.log('isLoaded', isLoaded)
	// console.log('height', height)

	const handle = useInitial({
		layoutFirstRender: () => {
			setIsLoaded(true)
		},
	})

	return (
		<div
			{...otherProps}
			ref={refs(lazy.ref, restoreHeight.ref, ref)}
			style={{
				height: ssrFix.isFirstRender || lazy.show ? undefined : height,
				...style,
			}}
		>
			{Boolean(lazy.show) && (
				<Suspense fallback={<div style={{ height }} />}>
					{!isLoaded && (
						<Lifecycle onLayoutFirstRender={handle.layoutFirstRender} />
					)}

					{children}
				</Suspense>
			)}
		</div>
	)
}

LazyRender.displayName = 'Lazy'

/**
 * `Lazy` will start rendering `children` after it's visible in viewport.
 *
 * It will persist its height in `localStorage` and set is as `style` prop
 * before the actual content is rendered. (no `styler`)
 */
export const Lazy = forwardRef(LazyRender)
