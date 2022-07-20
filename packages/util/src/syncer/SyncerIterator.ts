// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import type {
// 	NotProvided,
// 	OptionalArgument,
// } from '../OptionalArgument/OptionalArgument.js'
import type { ISyncerNested, SyncerNested } from './SyncerNested.js'
import type { PartialSyncerSwitch, SyncerSwitch } from './SyncerSwitch.js'

export type ISyncerIterator<Return = unknown> = Generator<
	PartialSyncerSwitch | ISyncerIterator | ISyncerNested,
	Return,
	unknown
>

export type SyncerIterator<Return, Intermediate> = Generator<
	| (undefined extends Intermediate
			? PartialSyncerSwitch<Intermediate>
			: SyncerSwitch<Intermediate>)
	| ISyncerIterator<Intermediate>
	| SyncerNested<Intermediate>,
	Return,
	Awaited<Intermediate>
>

//! TODO
// export type SyncerIterator<
// 	Return = unknown,
// 	Intermediate extends OptionalArgument<unknown> = NotProvided,
// > = Intermediate extends NotProvided
// 	? ISyncerIterator<Return>
// 	: SyncerIterator_<Return, Intermediate>
