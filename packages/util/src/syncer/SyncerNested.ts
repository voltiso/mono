// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoArgument, OptionalArgument } from '~/type/optional-argument'

import type { ISyncerPromise } from './SyncerPromise'

export interface ISyncerNested {
	onAsyncStart?:
		| ((promise: PromiseLike<any>) => PromiseLike<void> | void)
		| undefined
	syncerIterator: ISyncerPromise
}

export interface SyncerNested_<Intermediate> {
	onAsyncStart?:
		| ((promise: PromiseLike<Intermediate>) => PromiseLike<void> | void)
		| undefined
	syncerIterator: ISyncerPromise<Intermediate>
}

export type SyncerNested<
	Intermediate extends OptionalArgument<unknown> = NoArgument,
> = Intermediate extends NoArgument
	? ISyncerNested
	: SyncerNested_<Intermediate>

export function isSyncerNested(x: unknown): x is ISyncerNested {
	return Boolean((x as SyncerNested<unknown> | null)?.syncerIterator)
}
