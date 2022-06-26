import { Eval, Expr, PreprocessExpr } from "../parser.js";

type MapBool<b, T, F> =
	| (true extends b ? T : never)
	| (false extends b ? F : never);

type Replace<Old, New, Expr> = MapBool<Eval<Expr, [Old]>, New, Old>;

type ReplaceIf_<Arr, New, Expr, acc extends unknown[]> = Arr extends [
	infer H,
	...infer T
]
	? ReplaceIf_<T, New, Expr, [...acc, Replace<H, New, Expr>]>
	: Arr extends []
	? acc
	: never;

export type ReplaceIf<Arr, New, e extends Expr> = ReplaceIf_<
	Arr,
	New,
	PreprocessExpr<e>,
	[]
>;
