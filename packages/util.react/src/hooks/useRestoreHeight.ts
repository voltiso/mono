// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined, undef } from '@voltiso/util'
import { useEffect, useMemo } from 'react'

import { useInitial } from '~/hooks'
import { LocalStorage } from '~/LocalStorage'

type UseRestoreHeight = {
	height: number | undefined
	// eslint-disable-next-line etc/no-misused-generics
	ref: <Element extends HTMLElement>(instance: Element | null) => void
}

//

export function useRestoreHeight(localStorageKey: string): UseRestoreHeight

export function useRestoreHeight(localStorageKey: undefined): UseRestoreHeight

export function useRestoreHeight(
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
				undef,
			)
		else return undef
	}, [localStorageKey])

	const height = useMemo(
		() => (localStorage ? localStorage.data : undef),
		[localStorage],
	)

	useEffect(() => {
		if (!localStorage) return undef

		const interval = setInterval(() => {
			if (!mutable.instance) return

			const height = mutable.instance.clientHeight
			localStorage.data = height
			// eslint-disable-next-line no-magic-numbers
		}, 1_000)

		return () => {
			clearInterval(interval)
		}
	}, [localStorage, mutable])

	return {
		height,

		ref: <Element extends HTMLElement>(instance: Element | null) => {
			mutable.instance = instance

			// if (instance && height) instance.style.minHeight = `${height}px`
		},
	}
}
