// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import { useMemo } from 'react'
import type { IntersectionOptions } from 'react-intersection-observer'
import { useInView } from 'react-intersection-observer'

import { useCurrent } from './useCurrent'

export interface UseLazyLoadResult {
	ref: <Element>(instance: Element | null) => void
	show: boolean
	element: unknown
}

export function useLazyLoad(
	options?: IntersectionOptions | undefined,
): UseLazyLoadResult {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.000_1,
		...options,
	})

	// const [element, setElement] = useState<HTMLElement>()
	// eslint-disable-next-line sonarjs/no-redundant-type-constituents
	const current = useCurrent<{ element: unknown | null }>({ element: null })

	const myRef = useMemo(
		() =>
			<Element>(instance: Element | null) => {
				if (instance === current.element) return

				current.element = instance
				ref(instance as never)
			},
		[current, ref],
	)

	return {
		ref: myRef,
		show: inView,
		element: current.element,
	}
}
