// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'
import type { RegExpEntry } from './RegExpEntry.js'

export interface StringOptions extends SchemaOptions {
	_out: string
	_in: string
	minLength: number | undefined
	maxLength: number | undefined
	regExps: RegExpEntry[]
}

export const defaultStringOptions = {
	...defaultSchemaOptions,
	_out: 0 as unknown as string,
	_in: 0 as unknown as string,
	minLength: undef,
	maxLength: undef,
	regExps: [] as [],
}

export type DefaultStringOptions = typeof defaultStringOptions
