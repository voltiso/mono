import { Ast, AstFromString } from './ast'
import { Op, OpPacked } from './op'

type EvalAstArray_Acc<r extends unknown[], arr, args extends unknown[]> = arr extends [infer a, ...infer as]
	? EvalAstArray_Acc<[...r, EvalAst<a, args>], as, args>
	: arr extends []
	? r
	: never

type EvalAstArray<arr extends unknown[], args extends unknown[]> = EvalAstArray_Acc<[], arr, args>

/**
 * - TODO: tail recursion
 */
export type EvalAst<ast = never, args extends unknown[] = []> = ast extends [infer op, infer asts]
	? op extends keyof Op
		? asts extends unknown[]
			? OpPacked<EvalAstArray<asts, args>>[op]
			: never
		: never
	: [...args, never, never, never, never, never, never, never, never, never, never] extends [
			infer A,
			infer B,
			infer C,
			infer D,
			infer E,
			infer F,
			infer G,
			infer H,
			infer I,
			...unknown[]
	  ]
	? ast extends '1'
		? A
		: ast extends '2'
		? B
		: ast extends '3'
		? C
		: ast extends '4'
		? D
		: ast extends '5'
		? E
		: ast extends '6'
		? F
		: ast extends '7'
		? G
		: ast extends '8'
		? H
		: ast extends '9'
		? I
		: never
	: never

/**
 * - TODO: constrain it better, not just `string`
 */
type ExprString = string

export type Expr = Ast | keyof Op | ExprString

export type PreprocessExpr<e extends Expr> = e extends keyof Op ? e : e extends string ? AstFromString<e> : e

export type Eval<expr = never, args extends unknown[] = []> = expr extends keyof Op
	? OpPacked<args>[expr]
	: expr extends Ast
	? EvalAst<expr, args>
	: expr extends string
	? EvalAst<AstFromString<expr>, args>
	: never
