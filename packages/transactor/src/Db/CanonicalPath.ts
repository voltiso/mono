// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Join } from '@voltiso/util'

import type { Id } from '~/Data'
import type { DocTag } from '~/DocTypes'

type IsSingleUnknownPathToken<A, T = true, F = false> = A extends DocTag
	? T
	: string extends A
	? T
	: A extends Id
	? A extends object
		? T
		: F
	: F

// declare module '@voltiso/util' {
// 	interface Op<A = def> {
// 		isSingleUnknownPathToken: IsSingleUnknownPathToken<A>
// 	}
// }

// type CanonicalPathTokens<Tokens> = ReplaceIf<Tokens, '...', 'isSingleUnknownPathToken'>

type CanonicalPathTokens_<
	tokens,
	acc extends readonly unknown[],
> = tokens extends readonly []
	? acc
	: tokens extends [infer h, ...infer t]
	? CanonicalPathTokens_<t, [...acc, IsSingleUnknownPathToken<h, '...', h>]>
	: never

type CanonicalPathTokens<tokens> = CanonicalPathTokens_<tokens, []>

export type CanonicalPath<Tokens> = Join<CanonicalPathTokens<Tokens>, '/'>
