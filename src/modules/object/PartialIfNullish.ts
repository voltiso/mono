/* eslint-disable @typescript-eslint/ban-types */
import { Nullish } from '../null'

type ExcludedPartial<T> = Partial<Exclude<T, Nullish>>

type NonNeverPartial<T> = ExcludedPartial<T> extends never ? {} : ExcludedPartial<T>

export type PartialIfNullish_<T> = null extends T ? NonNeverPartial<T> : undefined extends T ? NonNeverPartial<T> : T

export type PartialIfNullish<T extends object | Nullish> = PartialIfNullish_<T>
