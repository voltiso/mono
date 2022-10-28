// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'
import type { Get_, MaybePromise } from '@voltiso/util'

import type { $$Doc, GetDataWithId, IDoc } from '~/Doc'
import type { DocTI, $$DocTI, DTI } from '~/Doc/DocTI'
import type { $$DocRef, DocRef_ } from '~/DocRef'

export interface IAggregatorHandlers {
	initialValue?: unknown

	filter?(this: object): boolean | PromiseLike<boolean>

	target(
		this: object,
	): MaybePromise<($$Doc | $$DocRef)[]> | MaybePromise<$$Doc> | $$DocRef

	autoCreateTarget?: boolean | undefined

	include(this: object, acc: unknown): MaybePromise<unknown>
	exclude(this: object, acc: unknown): MaybePromise<unknown>
}

export type GetAggregate<
	Target extends $$Doc,
	Name,
	Kind extends 'out' | 'in',
> = Target extends IDoc ? _GetAggregate<Target, Name, Kind> : never

export type _GetAggregate<
	Target extends IDoc,
	Name,
	Kind extends 'out' | 'in',
> = Name extends keyof Target[DTI]['aggregates']
	? Type_<Target[DTI]['aggregates'][Name], { kind: Kind }>
	: never

//

export type AggregatorHandlers<
	SourceTI extends $$DocTI,
	Target extends $$Doc,
	Name extends string & keyof Get_<Get_<Target, DTI>, 'aggregates'>,
> = SourceTI extends DocTI
	? Target extends IDoc
		? AggregatorHandlers_<SourceTI, Target, Name>
		: never
	: never

export interface AggregatorHandlers_<
	SourceTI extends $$DocTI,
	Target extends $$Doc,
	Name extends string,
> {
	initialValue?: GetAggregate<Target, Name, 'out'> // out, not in - to mitigate bugs

	filter?(this: GetDataWithId<SourceTI>): MaybePromise<boolean>

	target(
		this: GetDataWithId<SourceTI>,
	):
		| MaybePromise<(Target | DocRef_<Get_<Target, DTI>>)[]>
		| MaybePromise<Target>
		| DocRef_<Get_<Target, DTI>>

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
