import { Eval, Expr } from './parser/eval'

export type StringContains<Str, Substr extends string, A, B> = Str extends `${string}${Substr}${string}` ? A : B

export type MapBool<b, T, F> = (true extends b ? T : never) | (false extends b ? F : never)

export type ReplaceIf<Old, New, expr extends Expr> = MapBool<Eval<expr, [Old]>, New, Old>

// TODO: tail recursion
// TODO: parse Ast only once
export type ArrayReplaceIf<Arr, New, E extends Expr> = Arr extends [infer H, ...infer T]
	? [ReplaceIf<H, New, E>, ...ArrayReplaceIf<T, New, E>]
	: Arr extends []
	? []
	: never
