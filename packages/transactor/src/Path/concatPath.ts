// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Join } from '@voltiso/util'
import { join } from '@voltiso/util'

type R<Args extends readonly string[] | string> = Args extends string
	? Args
	: Join<Args, '/'>

export const concatPath = <Args extends readonly string[] | string>(
	args: Args,
): R<Args> => (typeof args === 'string' ? args : join(args, '/')) as R<Args>
