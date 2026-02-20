// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import { $fastAssert } from '@voltiso/util'
import { SCHEMA_NAME } from '_'

import type { $$Schema, Schema, Schema$ } from '~'

import type { StringOptions } from './StringOptions'

$fastAssert(SCHEMA_NAME)

export interface $$String extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'String'
}

/** Every String<O> is assignable to IString */
export interface IString extends Schema<string> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'String'

	readonly [Voltiso.BASE_OPTIONS]: StringOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: StringOptions.Default

	get getMinLength(): number | undefined
	get getMaxLength(): number | undefined
}

/** Every String$<O> is assignable to IString$ */
export interface IString$ extends Schema$<string> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'String'

	readonly [Voltiso.BASE_OPTIONS]: StringOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: StringOptions.Default

	get getMinLength(): number | undefined
	get getMaxLength(): number | undefined

	minLength(min: number): any
	maxLength(max: number): any
	length(exactLength: number): any
	lengthRange(min: number, max: number): any

	//

	get Final(): IString
}

export function isStringSchema(x: unknown): x is IString$ {
	return (x as IString | null)?.[Voltiso.Schemar.SCHEMA_NAME] === 'String'
}
