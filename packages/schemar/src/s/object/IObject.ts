// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { ObjectOptions } from './_/ObjectOptions.js'

export const IS_OBJECT = Symbol('IS_SHAPE')
export type IS_OBJECT = typeof IS_OBJECT

export interface IObject<O extends ObjectOptions = ObjectOptions>
	extends ISchema<O> {
	readonly [IS_OBJECT]: true

	readonly getShape: O['shape']

	readonly partial: IObject
	readonly deepPartial: IObject
}

export function isObject(x: unknown): x is IObject {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IObject | null)?.[IS_OBJECT])
}
