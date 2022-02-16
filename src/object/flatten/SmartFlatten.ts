import { Assert } from '../../assert'
import { CanBeUndefined } from '../CanBeUndefined'
import { IsEqual } from '../../IsEqual'
import { IsOptional } from '../IsOptional'
import { Callable, Newable } from '../../types'

type SmartFlattenValue<T, k extends keyof T, e> = IsOptional<
	T,
	k,
	CanBeUndefined<T, k, SmartFlattenImpl<T[k], e>, Exclude<SmartFlattenImpl<T[k], e>, undefined>>,
	SmartFlattenImpl<T[k], e>
>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SmartFlattenImpl<T, e> = T extends Callable<any[]>
	? T
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Newable<any[]>
	? T
	: T extends e
	? T
	: [{ [k in keyof T]: SmartFlattenValue<T, k, e | T> }][0]

export type SmartFlatten<T> = SmartFlattenImpl<T, never>

Assert<IsEqual<SmartFlatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>()
Assert<IsEqual<SmartFlatten<{ a?: 1 }>, { a?: 1 }>>()
Assert<IsEqual<SmartFlatten<{ a?: 1 | undefined }>, { a?: 1 }>, false>()

Assert<SmartFlatten<number>, number>()
Assert<number, SmartFlatten<number>>()

Assert<SmartFlatten<string>, string>()
Assert<string, SmartFlatten<string>>()

Assert<Date, SmartFlatten<Date>>()
Assert<SmartFlatten<Date>, Date>()

Assert<typeof Date, SmartFlatten<typeof Date>>()
Assert<SmartFlatten<typeof Date>, typeof Date>()

type Rec = Rec[] | string
Assert<Rec, SmartFlatten<Rec>>()
Assert<SmartFlatten<Rec>, Rec>()
