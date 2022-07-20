// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import type { NotProvided, OptionalArgument } from '../OptionalArgument'
import type { NotProvided, OptionalArgument } from '../OptionalArgument'
import type { ISyncerIterator } from './SyncerIterator.js'

export interface ISyncerNested {
	onAsyncStart?:
		| ((promise: PromiseLike<any>) => Promise<void> | void)
		| undefined
	syncerIterator: ISyncerIterator
}

export interface SyncerNested_<Intermediate> {
	onAsyncStart?:
		| ((promise: PromiseLike<Intermediate>) => Promise<void> | void)
		| undefined
	syncerIterator: ISyncerIterator<Intermediate>
}

export type SyncerNested<
	Intermediate extends OptionalArgument<unknown> = NotProvided,
> = Intermediate extends NotProvided
	? ISyncerNested
	: SyncerNested_<Intermediate>

export function isSyncerNested(x: unknown): x is ISyncerNested {
	return Boolean((x as SyncerNested<unknown> | null)?.syncerIterator)
}
