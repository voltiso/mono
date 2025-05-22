// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OptionalArgument } from '~/type/optional-argument'

import type { ISyncerNested, SyncerNested } from './SyncerNested'
import type { PartialSyncerSwitch, SyncerSwitch } from './SyncerSwitch'
import { UNSET } from '_/symbols/unset'

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
	Intermediate extends OptionalArgument<unknown> = UNSET,
> = [Intermediate] extends [UNSET]
	? ISyncerPromise<Return>
	: SyncerPromise_<Return, Intermediate>
