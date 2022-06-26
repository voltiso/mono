import type { SyncerIterator } from "./SyncerIterator.js";

export type SyncerFunction<
	Args extends unknown[] = never[],
	Return = unknown,
	Intermediate = unknown
> = (...args: Args) => SyncerIterator<Return, Intermediate>;
