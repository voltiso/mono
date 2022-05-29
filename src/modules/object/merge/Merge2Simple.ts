import { _ } from '../flatten'

// export type Merge2Simple<A, B> = Omit<A, keyof B> & B
export type Merge2Simple<A, B> = _<Omit<A, keyof B> & B>

// export type Merge2Simple<
// 	A extends object | Nullish,
// 	B extends object | Nullish
// > = Merge2Simple_<PartialIfNullish_<A>, PartialIfNullish_<B>>
