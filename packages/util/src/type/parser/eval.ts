// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Ast, AstFromString } from './ast'
import type { Operation, OperationPacked } from './Operation'

type EvalAstArray_Accumulator<
	r extends unknown[],
	array,
	args extends unknown[],
> = array extends [infer a, ...infer as]
	? EvalAstArray_Accumulator<[...r, EvalAst<a, args>], as, args>
	: array extends []
	? r
	: never

type EvalAstArray<
	array extends unknown[],
	args extends unknown[],
> = EvalAstArray_Accumulator<[], array, args>

/** - TODO: tail recursion */
export type EvalAst<ast = never, args extends unknown[] = []> = ast extends [
	infer operation,
	infer asts,
]
	? operation extends keyof Operation
		? asts extends unknown[]
			? OperationPacked<EvalAstArray<asts, args>>[operation]
			: never
		: never
	: [
			...args,
			never,
			never,
			never,
			never,
			never,
			never,
			never,
			never,
			never,
			never,
	  ] extends [
			infer A,
			infer B,
			infer C,
			infer D,
			infer E,
			infer F,
			infer G,
			infer H,
			infer I,
			...unknown[],
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

/** - TODO: constrain it better, not just `string` */
type ExprString = string

export type Expr = Ast | keyof Operation | ExprString

export type PreprocessExpr<E extends Expr> = E extends keyof Operation
	? E
	: E extends string
	? AstFromString<E>
	: E

export type Eval<
	expr = never,
	args extends unknown[] = [],
> = expr extends keyof Operation
	? OperationPacked<args>[expr]
	: expr extends Ast
	? EvalAst<expr, args>
	: expr extends string
	? EvalAst<AstFromString<expr>, args>
	: never
