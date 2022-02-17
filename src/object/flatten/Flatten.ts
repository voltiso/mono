/* eslint-disable @typescript-eslint/no-explicit-any */

import { Assert } from '../../assert'
import { CanBeUndefined } from '../CanBeUndefined'
import { IsIdentical } from '../../IsEqual'
import { IsOptional } from '../IsOptional'
import { Callable, Newable } from '../../types'

type FlattenValue<T, k extends keyof T> = [IsOptional<T, k>] extends [true]
	? [CanBeUndefined<T, k>] extends [true]
		? T[k]
		: Exclude<T[k], undefined>
	: T[k]

export type Flatten<T> = T extends Callable<any[]>
	? T
	: T extends Newable<any[]>
	? T
	: [{ [k in keyof T]: FlattenValue<T, k> }][0]

Assert<IsIdentical<Flatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>()
Assert<IsIdentical<Flatten<{ a?: 1 }>, { a?: 1 }>>()
Assert<IsIdentical<Flatten<{ a?: 1 | undefined }>, { a?: 1 }>, false>()

Assert<Flatten<number>, number>()
Assert<number, Flatten<number>>()

Assert<Flatten<string>, string>()
Assert<string, Flatten<string>>()

Assert<Date, Flatten<Date>>()
Assert<Flatten<Date>, Date>()

Assert<typeof Date, Flatten<typeof Date>>()
Assert<Flatten<typeof Date>, typeof Date>()

type Rec = Rec[] | string
Assert<Rec, Flatten<Rec>>()
Assert<Flatten<Rec>, Rec>()
