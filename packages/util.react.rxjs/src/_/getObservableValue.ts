// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import type { IObservable } from '@voltiso/util.rxjs'

export function getObservableValue<T = unknown>(
	observable$: IObservable,
	fallback: T,
): T | undefined {
	return 'maybeValue' in observable$
		? ((observable$ as any).maybeValue as T | undefined)
		: 'value' in observable$
			? ((observable$ as any).value as T)
			: fallback
}
