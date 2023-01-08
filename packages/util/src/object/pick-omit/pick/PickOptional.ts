// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsOptional } from '~/object'

export type PickOptional<Obj extends object> = Pick<
	Obj,
	{
		[key in keyof Obj]: IsOptional<Obj, key> extends true ? key : never
	}[keyof Obj]
>
