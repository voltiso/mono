/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-magic-numbers */
import type { SyncerIterator } from '../src'

export function* differentIntermediates(
	s: string,
	n: number
): SyncerIterator<number> {
	const s2 = (yield {
		sync: () => 'test',
		async: async () => 'test',
	}) as string

	const n2 = (yield {
		sync: () => 33,
		async: async () => 33,
	}) as number

	return n + n2 + s.length + s2.length
}
