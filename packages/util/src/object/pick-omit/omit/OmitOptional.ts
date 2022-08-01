// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsOptional } from '~'

export type OmitOptional<Obj extends object> = Omit<
	Obj,
	{
		[key in keyof Obj]: IsOptional<Obj, key> extends true ? key : never
	}[keyof Obj]
>
