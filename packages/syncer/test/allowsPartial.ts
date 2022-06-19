/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-magic-numbers */
import type { SyncerIterator } from '../src'

export function* partialFun(): SyncerIterator<number, number | undefined> {
	const x = yield {
		async: () => 11,
	}

	return 100 + (x || 0)
}
