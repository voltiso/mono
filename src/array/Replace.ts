import { Eval, Expr } from '../parser'

type MapBool<b, T, F> = (true extends b ? T : never) | (false extends b ? F : never)

type Replace<Old, New, expr extends Expr> = MapBool<Eval<expr, [Old]>, New, Old>

// TODO: tail recursion
// TODO: parse Ast only once
export type ReplaceIf<Arr, New, E extends Expr> = Arr extends [infer H, ...infer T]
	? [Replace<H, New, E>, ...ReplaceIf<T, New, E>]
	: Arr extends []
	? []
	: never
