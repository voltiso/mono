// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'
import type { MaybePromise } from '@voltiso/util'

import type { DocLike, GetDataWithId } from '~/Doc'
import type { DocTILike, DTI } from '~/Doc/DocTI'
import type { DocRefLike } from '~/DocRef'

export interface IAggregatorHandlers {
	initialValue?: unknown

	filter?(this: object): boolean | PromiseLike<boolean>

	target(
		this: object,
	): MaybePromise<(DocLike | DocRefLike)[]> | MaybePromise<DocLike> | DocRefLike

	autoCreateTarget?: boolean | undefined

	include(this: object, acc: unknown): MaybePromise<unknown>
	exclude(this: object, acc: unknown): MaybePromise<unknown>
}

export type GetAggregate<
	Target extends DocLike,
	Name,
	Kind extends 'out' | 'in',
> = Name extends keyof Target[DTI]['aggregates']
	? Type_<Target[DTI]['aggregates'][Name], { kind: Kind }>
	: never

//

export interface AggregatorHandlers<
	SourceTI extends DocTILike,
	Target extends DocLike,
	Name extends keyof Target[DTI]['aggregates'],
> {
	initialValue?: GetAggregate<Target, Name, 'out'> // out, not in - to mitigate bugs

	filter?(this: GetDataWithId<SourceTI>): MaybePromise<boolean>

	target(
		this: GetDataWithId<SourceTI>,
	):
		| MaybePromise<(Target | DocRefLike<Target[DTI]>)[]>
		| MaybePromise<Target>
		| DocRefLike<Target[DTI]>

	autoCreateTarget?: boolean | undefined

	include(
		this: GetDataWithId<SourceTI>,
		acc: GetAggregate<Target, Name, 'out'>, // | InitialValue
	): MaybePromise<GetAggregate<Target, Name, 'out'>> // out, not in - to mitigate bugs

	exclude(
		this: GetDataWithId<SourceTI>,
		acc: GetAggregate<Target, Name, 'out'>,
	): MaybePromise<GetAggregate<Target, Name, 'out'>> // out, not in - to mitigate bugs
}
