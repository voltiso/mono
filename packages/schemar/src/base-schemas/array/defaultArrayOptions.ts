// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { $$Schema } from '~/types/Schema/ISchema'

import { unknown } from '../unknown/Unknown'
import type { ArrayOptions } from './ArrayOptions'

export type __hack_defaultArrayOptions = $$Schema

$fastAssert(defaultSchemaOptions)

export const defaultArrayOptions: ArrayOptions.Default = Object.freeze({
	...defaultSchemaOptions,
	Output: 0 as unknown as readonly unknown[],
	Input: 0 as unknown as readonly unknown[],

	isReadonlyArray: false as const,

	element: unknown,
	// eslint-disable-next-line sonarjs/no-undefined-assignment
	minLength: undefined,
	// eslint-disable-next-line sonarjs/no-undefined-assignment
	maxLength: undefined,
})

export const defaultMutableArrayOptions = Object.freeze({
	...defaultArrayOptions,
	isReadonlyArray: false as const,
})

export const defaultReadonlyArrayOptions = Object.freeze({
	...defaultArrayOptions,
	isReadonlyArray: true as const,
})
