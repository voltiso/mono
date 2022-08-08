// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactNode } from 'react'

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

//

export type ValidScrollProps = ScrollProps &
	(
		| {
				scrollRestorationKey: string
				saveScrollInterval?: number | undefined
		  }
		| { saveScrollInterval?: undefined }
	)
