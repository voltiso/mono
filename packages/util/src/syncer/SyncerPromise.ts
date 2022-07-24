// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '../type/optional-argument'
import type { ISyncerNested, SyncerNested } from './SyncerNested.js'
import type { PartialSyncerSwitch, SyncerSwitch } from './SyncerSwitch.js'

export type ISyncerPromise<Return = unknown> = Generator<
	PartialSyncerSwitch | ISyncerPromise | ISyncerNested,
	Return,
	unknown
>

type SyncerPromise_<Return, Intermediate> = Generator<
	| (undefined extends Intermediate
			? PartialSyncerSwitch<Intermediate>
			: SyncerSwitch<Intermediate>)
	| ISyncerPromise<Intermediate>
	| SyncerNested<Intermediate>,
	Return,
	Awaited<Intermediate>
>

export type SyncerPromise<
	Return = unknown,
	Intermediate extends OptionalArgument<unknown> = NotProvided,
> = [Intermediate] extends [NotProvided]
	? ISyncerPromise<Return>
	: SyncerPromise_<Return, Intermediate>
