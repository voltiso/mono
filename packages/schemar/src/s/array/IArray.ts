// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { ArrayOptions } from './_/ArrayOptions.js'

export const IS_ARRAY = Symbol('IS_ARRAY')
export type IS_ARRAY = typeof IS_ARRAY

export interface IArray<O extends ArrayOptions = ArrayOptions>
	extends ISchema<O> {
	readonly [IS_ARRAY]: true

	readonly getElementSchema: O['element']
	readonly isReadonlyArray: O['readonlyArray']
	readonly getMinLength: O['minLength']
	readonly getMaxLength: O['maxLength']

	readonly readonlyArray: IArray
}

export function isArray(x: unknown): x is IArray {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IArray | null)?.[IS_ARRAY])
}
