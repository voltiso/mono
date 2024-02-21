// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CanBeUndefined } from '../CanBeUndefined'
import type { IsOptional } from '../IsOptional'

/** @inline */ type DeepFlattenValue<T, k extends keyof T> = IsOptional<
	T,
	k,
	CanBeUndefined<
		T,
		k,
		DeepFlatten<T[k]>,
		Exclude<DeepFlatten<T[k]>, undefined>
	>,
	DeepFlatten<T[k]>
>
/** @inline */ export type DeepFlatten<T> = T extends (...args: any) => any
	? T
	: T extends abstract new (...args: any) => any
		? T
		: // eslint-disable-next-line @typescript-eslint/no-magic-numbers
			[{ [k in keyof T]: DeepFlattenValue<T, k> }][0]
