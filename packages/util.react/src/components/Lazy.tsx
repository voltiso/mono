// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'
import type {
	ComponentPropsWithRef,
	CSSProperties,
	FC,
	ReactNode,
	RefCallback,
} from 'react'
import { Suspense, useMemo, useState } from 'react'

import { combineRefCallbacks } from '~/combineRefCallbacks'
import { Lifecycle } from '~/components'
import { useCurrent, useLazyLoad, useRestoreHeight } from '~/hooks'
import { useSsrFix } from '~/hooks/useSsrFix'

export const Lazy: FC<
	ComponentPropsWithRef<'div'> & {
		storageKey?: string | undefined

		children: ReactNode
		style?: CSSProperties | undefined
		ref?: RefCallback<HTMLDivElement> | undefined
	}
> = props => {
	const { children, storageKey, ref, style, ...otherProps } = props

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

	const finalRef = useMemo(
		() =>
			ref
				? combineRefCallbacks(lazy.ref, restoreHeight.ref, ref)
				: combineRefCallbacks(lazy.ref, restoreHeight.ref),
		[lazy.ref, ref, restoreHeight.ref],
	)

	// console.log('lazy.show', lazy.show)
	// console.log('isLoaded', isLoaded)
	// console.log('height', height)

	const handle = useCurrent({
		firstRender: () => setIsLoaded(true),
	})

	return (
		<div
			{...otherProps}
			ref={finalRef}
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
