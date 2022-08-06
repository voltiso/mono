import type { RefCallback } from 'react'

export function combineRefCallbacks<T>(...refs: readonly RefCallback<T>[]) {
	return (instance: T | null) => {
		for (const ref of refs) {
			ref(instance)
		}
	}
}
