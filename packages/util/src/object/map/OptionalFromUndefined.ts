// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '../flatten'

export type OptionalFromUndefined<T> = _<
	{
		[key in keyof T as undefined extends T[key] ? never : key]: T[key]
	} & {
		[key in keyof T as undefined extends T[key] ? key : never]?: Exclude<
			T[key],
			undefined
		>
	}
>
