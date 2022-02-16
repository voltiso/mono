import { Assert } from './assert'
import { IsEqual } from './IsEqual'
import { Eval, Expr } from './parser/eval'

export type StringContains<Str, Substr extends string, A, B> = Str extends `${string}${Substr}${string}` ? A : B

export type MapBool<b, T, F> = (true extends b ? T : never) | (false extends b ? F : never)

export type ReplaceIf<Old, New, expr extends Expr> = MapBool<Eval<expr, [Old]>, New, Old>

Assert<ReplaceIf<number, 123, 'isNumber'>, 123>()

// TODO: tail recursion
// TODO: parse Ast only once
export type ArrayReplaceIf<Arr, New, E extends Expr> = Arr extends [infer H, ...infer T]
	? [ReplaceIf<H, New, E>, ...ArrayReplaceIf<T, New, E>]
	: Arr extends []
	? []
	: never

Assert<IsEqual<ArrayReplaceIf<['sdf', 2, 1, 'dfg', 2], 10, 'isString'>, [10, 2, 1, 10, 2]>>()
Assert<IsEqual<ArrayReplaceIf<[string, 'a', 'x'], null, 'isSuperString'>, [null, 'a', 'x']>>()
Assert<IsEqual<ArrayReplaceIf<['', 'asd', 0, 123], 'TEST', 'isNumber 1 & !!1'>, ['', 'asd', 0, 'TEST']>>()
