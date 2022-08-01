// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! TODO: use `@voltiso/patcher`

import type { Data, NestedData } from '~/Data/Data'

const IS_REPLACE_IT = Symbol('IS_REPLACE_IT')

export class ReplaceIt<T> {
	readonly [IS_REPLACE_IT] = true as const

	data: T
	constructor(data: T) {
		this.data = data
	}
}

// export function replaceIt<T extends Data>(data: T): ReplaceIt<T>
// export function replaceIt<T extends NestedData>(data: T): ReplaceIt<T>
export function replaceIt<T extends Data | NestedData>(data: T): ReplaceIt<T> {
	return new ReplaceIt(data)
}

export function isReplaceIt(x: unknown): x is ReplaceIt<unknown> {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as ReplaceIt<unknown> | null)?.[IS_REPLACE_IT])
}
