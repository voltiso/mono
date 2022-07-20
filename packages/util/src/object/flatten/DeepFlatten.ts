// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CanBeUndefinedImpl } from '../CanBeUndefined.js'
import type { IsOptional_ } from '../IsOptional.js'

type DeepFlattenValue<T, k extends keyof T> = IsOptional_<
	T,
	k,
	CanBeUndefinedImpl<
		T,
		k,
		DeepFlatten<T[k]>,
		Exclude<DeepFlatten<T[k]>, undefined>
	>,
	DeepFlatten<T[k]>
>
export type DeepFlatten<T> = T extends (...args: any) => any
	? T
	: T extends abstract new (...args: any) => any
	? T
	: [{ [k in keyof T]: DeepFlattenValue<T, k> }][0]
