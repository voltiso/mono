// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/util'

/** @internal */
export type _GetUnknownPathTokens<
	P extends string,
	Acc extends unknown[],
> = string extends P
	? string[]
	: P extends `{${infer Token}}${infer Tail}`
	? // eslint-disable-next-line etc/no-internal
	  _GetUnknownPathTokens<Tail, [...Acc, Token]>
	: P extends `*${infer Tail}`
	? Tail extends `*${infer Tail2}`
		? // eslint-disable-next-line etc/no-internal
		  _GetUnknownPathTokens<Tail2, [...Acc, '**']>
		: // eslint-disable-next-line etc/no-internal
		  _GetUnknownPathTokens<Tail, [...Acc, '*']>
	: P extends `${string}${infer Tail}`
	? // eslint-disable-next-line etc/no-internal
	  _GetUnknownPathTokens<Tail, Acc>
	: Acc

export type GetUnknownPathTokens<P extends string> =
	// eslint-disable-next-line etc/no-internal
	_GetUnknownPathTokens<P, []>

export function getUnknownPathTokens<P extends string>(
	pattern: P,
): GetUnknownPathTokens<P> {
	return [...pattern.matchAll(/\{([^{}]*)\}|\*{1,2}/gu)].map(r => {
		const res = r[1] || r[0]
		assert(res)
		return res
	}) as never
}
