// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable sonarjs/no-nested-conditional */

import type { IObservable } from '@voltiso/util.rxjs'

export function getObservableValue<T = unknown>(
	observable$: IObservable,
	fallback: T,
): T | undefined {
	// eslint-disable-next-line no-nested-ternary
	return 'maybeValue' in observable$
		? ((observable$ as any).maybeValue as T | undefined)
		: 'value' in observable$
			? ((observable$ as any).value as T)
			: fallback
}
