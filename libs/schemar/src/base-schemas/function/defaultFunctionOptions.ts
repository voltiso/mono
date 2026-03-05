// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import { $fastAssert, lazyObject } from '@voltiso/util'
import { UNSET } from '_/symbols'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { SchemaLike } from '~/types/Schema/ISchema'

import { any } from '../any/any'
import { array } from '../array/Array'
import { unknown } from '../unknown/Unknown'

$fastAssert(defaultSchemaOptions)

export const defaultFunctionOptions = lazyObject(() =>
	Object.freeze({
		...defaultSchemaOptions,
		Output: 0 as unknown as (...args: any) => unknown,
		Input: 0 as unknown as (...args: any) => unknown,

		Outer: 0 as unknown as (...args: any) => unknown,
		Inner: 0 as unknown as (...args: any) => unknown,

		this: UNSET,
		parameters: array(any) as unknown as SchemaLike<any[]>,
		return: unknown as unknown as SchemaLike<void>,
	}),
)
