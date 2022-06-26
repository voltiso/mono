import type { PartialSyncerSwitch, SyncerSwitch } from "./SyncerSwitch";

export type SyncerNested<Intermediate> = {
	syncerIterator: SyncerIterator<Intermediate, unknown>;
	onAsyncStart?: (() => Promise<void> | void) | undefined;
};

export function isSyncerNested(x: unknown): x is SyncerNested<unknown> {
	return !!(x as SyncerNested<unknown> | null)?.syncerIterator;
}

//

export type SyncerIterator<
	Return = unknown,
	Intermediate = unknown
> = Generator<
	| (undefined extends Intermediate
			? PartialSyncerSwitch<Intermediate>
			: SyncerSwitch<Intermediate>)
	| SyncerIterator<Intermediate, unknown>
	| SyncerNested<Intermediate>,
	Return,
	Awaited<Intermediate>
>;

//

// TODO: move to @voltiso/util.iterator ?
export function isIterable(x: unknown): x is Iterable<unknown> {
	return (
		typeof (x as Iterable<unknown> | null)?.[Symbol.iterator] === "function"
	);
}
