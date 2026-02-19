// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { fastAssert } from '@voltiso/util'

/** @internal */
export type _GetUnknownPathTokens<
	P extends string,
	Acc extends unknown[],
> = string extends P
	? string[]
	: P extends `{${infer Token}}${infer Tail}`
		? _GetUnknownPathTokens<Tail, [...Acc, Token]>
		: P extends `*${infer Tail}`
			? Tail extends `*${infer Tail2}`
				? _GetUnknownPathTokens<Tail2, [...Acc, '**']>
				: _GetUnknownPathTokens<Tail, [...Acc, '*']>
			: P extends `${string}${infer Tail}`
				? _GetUnknownPathTokens<Tail, Acc>
				: Acc

export type GetUnknownPathTokens<P extends string> = _GetUnknownPathTokens<
	P,
	[]
>

export function getUnknownPathTokens<P extends string>(
	pattern: P,
): GetUnknownPathTokens<P> {
	// eslint-disable-next-line sonarjs/regular-expr
	return [...pattern.matchAll(/\{([^{}]*)\}|\*{1,2}/gu)].map(r => {
		const res = r[1] ?? r[0]
		fastAssert(res)
		return res
	}) as never
}
