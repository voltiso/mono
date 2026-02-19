// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Join } from '@voltiso/util'
import { join } from '@voltiso/util'

export type ConcatPath<Args extends readonly string[] | string> =
	Args extends string ? Args : Join<Args, { separator: '/' }>

export function concatPath<Args extends readonly string[] | string>(
	args: Args,
): ConcatPath<Args> {
	return (
		typeof args === 'string' ? args : join(args, { separator: '/' })
	) as ConcatPath<Args>
}
