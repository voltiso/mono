// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined } from '@voltiso/util'
import { useEffect, useMemo } from 'react'

import { useInitial } from '~/hooks'
import { LocalStorage } from '~/LocalStorage'

interface UseRestoreHeight {
	height: number | undefined
	ref: <Element extends HTMLElement>(instance: Element | null) => void
}

//

export function useRestoreHeight(localStorageKey: string): UseRestoreHeight

// eslint-disable-next-line @typescript-eslint/unified-signatures
export function useRestoreHeight(localStorageKey: undefined): UseRestoreHeight

export function useRestoreHeight(
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	localStorageKey: string | undefined,
): UseRestoreHeight

//

export function useRestoreHeight(
	localStorageKey: string | undefined,
): UseRestoreHeight {
	const mutable = useInitial({
		instance: null as HTMLElement | null,
	})

	const localStorage = useMemo(() => {
		if (isDefined(localStorageKey))
			return new LocalStorage<number | undefined>(
				`@voltiso/util.react.useRestoreHeight(${localStorageKey})`,
				undefined,
			)
		else return undefined
	}, [localStorageKey])

	const height = useMemo(
		() => (localStorage ? localStorage.data : undefined),
		[localStorage],
	)

	useEffect(() => {
		if (!localStorage) return undefined

		const interval = setInterval(() => {
			if (!mutable.instance) return

			const height = mutable.instance.clientHeight
			localStorage.data = height
			// eslint-disable-next-line no-magic-numbers, @typescript-eslint/no-magic-numbers
		}, 1_000)

		return () => {
			clearInterval(interval)
		}
	}, [localStorage, mutable])

	return {
		height,

		ref: <Element extends HTMLElement>(instance: Element | null) => {
			mutable.instance = instance
		},
	}
}
