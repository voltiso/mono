// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Eval, Expr, PreprocessExpr } from '~/type/parser'

type MapBool<b, T, F> =
	| (true extends b ? T : never)
	| (false extends b ? F : never)

type Replace<Old, New, Expr> = MapBool<Eval<Expr, [Old]>, New, Old>

type ReplaceIf_<Arr, New, Expr, accumulator extends unknown[]> = Arr extends [
	infer H,
	...infer T,
]
	? ReplaceIf_<T, New, Expr, [...accumulator, Replace<H, New, Expr>]>
	: Arr extends []
		? accumulator
		: never

export type ReplaceIf<Arr, New, E extends Expr> = ReplaceIf_<
	Arr,
	New,
	PreprocessExpr<E>,
	[]
>
