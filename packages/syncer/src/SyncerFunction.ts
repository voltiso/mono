import type { SyncerIterator } from './SyncerIterator'

export type SyncerFunction<
	Args extends unknown[] = never[],
	Return = unknown,
	Intermediate = unknown
> = (...args: Args) => SyncerIterator<Return, Intermediate>
