// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useMemo } from 'react'
import type { IntersectionOptions } from 'react-intersection-observer'
import { useInView } from 'react-intersection-observer'

import { useCurrent } from '~/hooks'

export function useLazyLoad(options?: IntersectionOptions | undefined) {
	const { ref, inView } = useInView({
		triggerOnce: true,
		...options,
	})

	// const [element, setElement] = useState<HTMLElement>()
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
