// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brand } from '~/type/brand'

declare module '~/Brands-augmentation' {
	interface Brands {
		plain: {}
	}
}

//

export type PlainObject<S extends {} = {}> = S & object & Brand<'plain'>

//

export function isPlainObject<CastToType extends {} = {}>(
	x: unknown,
): x is PlainObject<CastToType> {
	// eslint-disable-next-line sonarjs/no-built-in-override
	const constructor = (x as object | null)?.constructor
	return constructor?.name === 'Object'
}
