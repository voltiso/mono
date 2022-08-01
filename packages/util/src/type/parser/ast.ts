// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Operation } from './Operation'
import type { Tokenize } from './tokenize'

export type Ast =
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| [keyof Operation, Ast[]]

type Finalize<nodes> = nodes extends [...unknown[], unknown, unknown]
	? Rec_StepOut<nodes, ['!!']>
	: nodes extends [['', [infer arg]]]
	? arg
	: nodes extends [infer node]
	? node
	: never

type Rec_Op1<nodes extends unknown[], t, ts> = nodes extends [
	...infer ns,
	['', []],
]
	? Rec<[...ns, [t, []]], ts>
	: Rec<[...nodes, [t, []]], ts>

type Rec_FixPrecedence<nodes extends unknown[], ts> = nodes extends [
	...infer ns,
	[infer op1, [...infer args1]],
	[infer op2, [infer a2, ...infer args2]],
]
	? op1 extends string
		? op2 extends string
			? `&|^` extends `${string}${op2}${string}${op1}${string}`
				? Rec<nodes, ts>
				: Rec_FixPrecedence<
						[...ns, [op2, [[op1, [...args1, a2]], ...args2]]],
						ts
				  >
			: Rec<nodes, ts>
		: Rec<nodes, ts>
	: Rec<nodes, ts>

type Rec_Op2<nodes, t extends string, ts> = nodes extends [
	...infer ns,
	[infer op, infer args],
]
	? [op, args] extends ['', [infer a]]
		? Rec<[...ns, [t, [a]]], ts>
		: [op, args] extends ['', [] | [unknown, unknown, ...unknown[]]]
		? never
		: // already have op
		args extends [...infer as, infer b]
		? op extends string
			? Rec_FixPrecedence<[...ns, [op, as], [t, [b]]], ts>
			: never
		: never
	: never

type Rec_Lit<nodes, t, ts> = nodes extends [
	...infer ns,
	[infer op, [...infer args]],
]
	? Rec<[...ns, [op, [...args, t]]], ts>
	: never

type Rec_StepIn<nodes extends unknown[], tokens> = Rec<
	[...nodes, ['', []]],
	tokens
>

type Rec_StepOut<nodes, tokens> = nodes extends [
	...infer nodesRest,
	[infer op, [...infer args]],
	infer b,
]
	? Rec<[...nodesRest, [op, [...args, b]]], tokens>
	: never

type Rec<nodes extends unknown[], tokens> = tokens extends [
	infer t,
	...infer ts,
]
	? t extends '!!'
		? Finalize<nodes>
		: t extends '('
		? Rec_StepIn<nodes, ts>
		: t extends ')'
		? Rec_StepOut<nodes, ts>
		: t extends string
		? '&|^' extends `${string}${t}${string}`
			? Rec_Op2<nodes, t, ts>
			: '123456789' extends `${string}${t}${string}`
			? Rec_Lit<nodes, t, ts>
			: Rec_Op1<nodes, t, ts>
		: never
	: never

export type AstFromTokens<tokens extends string[]> = Rec<
	[['', []]],
	[...tokens, '!!']
>

export type AstFromString<S> = AstFromTokens<Tokenize<S>>
