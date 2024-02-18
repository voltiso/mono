// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IObservable } from '@voltiso/util.rxjs'

export function getObservableValue<T = unknown>(
	observable$: IObservable,
	fallback: T,
): T | undefined {
	return 'maybeValue' in observable$
		? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			((observable$ as any).maybeValue as T | undefined)
		: 'value' in observable$
			? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				((observable$ as any).value as T)
			: fallback
}
