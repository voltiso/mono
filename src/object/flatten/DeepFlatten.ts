import { Assert } from '../../assert'
import { CanBeUndefined } from '../CanBeUndefined'
import { IsIdentical } from '../../IsEqual'
import { IsOptional } from '../IsOptional'
import { Callable, Newable } from '../../types'

type DeepFlattenValue<T, k extends keyof T> = IsOptional<
	T,
	k,
	CanBeUndefined<T, k, DeepFlatten<T[k]>, Exclude<DeepFlatten<T[k]>, undefined>>,
	DeepFlatten<T[k]>
>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DeepFlatten<T> = T extends Callable<any[]>
	? T
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Newable<any[]>
	? T
	: [{ [k in keyof T]: DeepFlattenValue<T, k> }][0]

Assert<IsIdentical<DeepFlatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>()
Assert<IsIdentical<DeepFlatten<{ a?: 1 }>, { a?: 1 }>>()
Assert<IsIdentical<DeepFlatten<{ a?: 1 | undefined }>, { a?: 1 }>, false>()

Assert<DeepFlatten<number>, number>()
Assert<number, DeepFlatten<number>>()

Assert<DeepFlatten<string>, string>()
Assert<string, DeepFlatten<string>>()

Assert<Date, DeepFlatten<Date>>()
Assert<DeepFlatten<Date>, Date>()

Assert<typeof Date, DeepFlatten<typeof Date>>()
Assert<DeepFlatten<typeof Date>, typeof Date>()
