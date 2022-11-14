// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CanBeUndefined } from '../CanBeUndefined'
import type { IsOptional } from '../IsOptional'

export type SmartFlattenValue<T, k extends keyof T, Encountered> = IsOptional<
	T,
	k,
	CanBeUndefined<
		T,
		k,
		SmartFlattenImpl<T[k], Encountered>,
		Exclude<SmartFlattenImpl<T[k], Encountered>, undefined>
	>,
	SmartFlattenImpl<T[k], Encountered>
>

export type SmartFlattenImpl<T, Encountered> = T extends (...args: any) => any
	? T
	: T extends abstract new (...args: any) => any
	? T
	: T extends Encountered
	? T
	: [{ [k in keyof T]: SmartFlattenValue<T, k, Encountered | T> }][0]

export type SmartFlatten<T> = SmartFlattenImpl<T, never>
