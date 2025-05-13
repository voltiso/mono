// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { Schema, Schema$ } from '~'

import type { BivariantUnknownFunction } from './UnknownFunctionOptions'

export interface IUnknownFunction<
	T extends BivariantUnknownFunction = BivariantUnknownFunction,
> extends Schema<T> {
	readonly [SCHEMA_NAME]: 'UnknownFunction'
}

export interface IUnknownFunction$<
	T extends BivariantUnknownFunction = BivariantUnknownFunction,
> extends Schema$<T> {
	readonly [SCHEMA_NAME]: 'UnknownFunction'
}

export function isUnknownFunctionSchema(x: unknown): x is IUnknownFunction$ {
	return (x as IUnknownFunction | null)?.[SCHEMA_NAME] === 'UnknownFunction'
}
