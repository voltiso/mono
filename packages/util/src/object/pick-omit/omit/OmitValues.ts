// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Value } from '~/object'

export type PickValues<obj, val> = Pick<
	obj,
	{
		[k in keyof obj]: Value<obj, k> extends val ? k : never
	}[keyof obj]
>

export type OmitValues<O, Val> = Pick<
	O,
	{
		[k in keyof O]: Value<O, k> extends Val ? never : k
	}[keyof O]
>

//

// export type OmitNevers<obj> = OmitValues<obj, never>
