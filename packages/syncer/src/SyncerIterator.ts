import type { PartialSyncerSwitch, SyncerSwitch } from './SyncerSwitch'

export type SyncerIterator<
	Return = unknown,
	Intermediate = unknown
> = Generator<
	| (undefined extends Intermediate
			? PartialSyncerSwitch<Intermediate>
			: SyncerSwitch<Intermediate>)
	| SyncerIterator<Intermediate, unknown>,
	Return,
	Awaited<Intermediate>
>

//

// TODO: move to @voltiso/util.iterator ?
export function isIterable(x: unknown): x is Iterable<unknown> {
	return (
		typeof (x as Iterable<unknown> | null)?.[Symbol.iterator] === 'function'
	)
}
