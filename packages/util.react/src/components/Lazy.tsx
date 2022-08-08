// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'
import type {
	ComponentPropsWithRef,
	CSSProperties,
	ForwardRefRenderFunction,
	ReactNode,
} from 'react'
import { forwardRef, Suspense, useState } from 'react'

import { Lifecycle } from '~/components'
import { useCurrent, useLazyLoad, useRestoreHeight } from '~/hooks'
import { useSsrFix } from '~/hooks/useSsrFix'
import { refs } from '~/refs'

const LazyRender: ForwardRefRenderFunction<
	HTMLDivElement,
	ComponentPropsWithRef<'div'> & {
		storageKey?: string | undefined

		children: ReactNode
		style?: CSSProperties | undefined
	}
> = (props, ref) => {
	const { children, storageKey, style, ...otherProps } = props

	const finalStorageKey = storageKey
		? `@voltiso/util.react.Lazy(${storageKey})`
		: undef

	const lazy = useLazyLoad()
	const restoreHeight = useRestoreHeight(finalStorageKey)

	const [isLoaded, setIsLoaded] = useState(false)

	// make SSR work (first render should not use LocalStorage)
	const ssrFix = useSsrFix()

	const height =
		isLoaded || !restoreHeight.height ? undefined : `${restoreHeight.height}px`

	// console.log('lazy.show', lazy.show)
	// console.log('isLoaded', isLoaded)
	// console.log('height', height)

	const handle = useCurrent({
		firstRender: () => setIsLoaded(true),
	})

	return (
		<div
			{...otherProps}
			ref={refs(lazy.ref, restoreHeight.ref, ref)}
			style={{
				height: ssrFix.isFirstRender ? undefined : height,
				...style,
			}}
		>
			{Boolean(lazy.show) && (
				<Suspense fallback={<div style={{ height }} />}>
					{!isLoaded && <Lifecycle onFirstRender={handle.firstRender} />}
					{children}
				</Suspense>
			)}
		</div>
	)
}

LazyRender.displayName = 'Lazy.render'

export const Lazy = forwardRef(LazyRender)
