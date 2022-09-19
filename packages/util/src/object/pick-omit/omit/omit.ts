// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { hasOwnProperty } from '~'
import { VoltisoUtilError } from '~/error/VoltisoUtilError'
import { stringFrom } from '~/string'

import { omitIfPresent } from './omitIfPresent'
import type { OmitSimple } from './OmitSimple'

export function omit<O extends object, K extends keyof O>(
	obj: O,
	...keys: K[]
): OmitSimple<O, K>

export function omit(obj: undefined, ...keys: never[]): undefined

export function omit(obj: null, ...keys: never[]): null

export function omit<O extends object, K extends keyof O>(
	obj: O | undefined | null,
	...keys: K[]
): OmitSimple<O, K> | undefined | null

export function omit<O extends object, K extends keyof O>(
	obj: O | undefined | null,
	...keys: K[]
): OmitSimple<O, K> | undefined | null {
	if (!obj) return obj as never

	for (const key of keys) {
		if (!hasOwnProperty(obj, key)) {
			throw new VoltisoUtilError(
				`omit(${stringFrom(obj)}, ${stringFrom(keys)}): key ${stringFrom(
					key,
				)} does not exist`,
			)
		}
	}

	return omitIfPresent(obj, ...keys)
}
