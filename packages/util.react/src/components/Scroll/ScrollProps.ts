// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactNode } from 'react'

export type ScrollProps = {
	as?: keyof JSX.IntrinsicElements | undefined
	scrollTarget?: keyof JSX.IntrinsicElements | undefined

	/** Override window.location.pathname - which may be stale */
	pathname?: string | undefined

	scrollRestorationKey?: string | undefined

	/**
	 * - Requires setting the `scrollRestorationKey`
	 *
	 * @defaultValue `0`
	 */
	scrollRestorationDelay?: number | undefined

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

export const defaultScrollProps = {
	as: 'div',
	scrollRestorationDelay: 0,
	saveScrollInterval: 1_000,
	setSmoothAfterDelay: 1_000,
} as const

//

// export type ValidScrollProps = ScrollProps &
// 	(
// 		| {
// 				scrollRestorationKey: string
// 				saveScrollInterval?: number | undefined
// 		  }
// 		| { saveScrollInterval?: undefined }
// 	)
