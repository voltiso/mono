// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OptionalArgument } from '~/type/optional-argument'

import type { ISyncerPromise } from './SyncerPromise'
import { UNSET } from '_/symbols/unset'

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
	Intermediate extends OptionalArgument<unknown> = UNSET,
> = Intermediate extends UNSET ? ISyncerNested : SyncerNested_<Intermediate>

export function isSyncerNested(x: unknown): x is ISyncerNested {
	return Boolean((x as SyncerNested<unknown> | null)?.syncerIterator)
}
