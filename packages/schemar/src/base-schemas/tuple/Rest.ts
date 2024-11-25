// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/class-methods-use-this */

import { BoundCallable, CALL } from '@voltiso/util'

import type { $$Schemable } from '~'

import type { Unknown, Unknown$ } from '../unknown/Unknown'
import { unknown } from '../unknown/Unknown'

export type __hack_Rest = Unknown$

export interface UnknownRest extends Rest<Unknown> {
	readonly element: Unknown
	<S extends $$Schemable>(element: S): Rest<S>
}

export const IS_REST = Symbol('IS_REST')

export interface Rest<S extends $$Schemable> {
	<S extends $$Schemable>(element: S): Rest<S>
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Rest<S extends $$Schemable = $$Schemable> {
	// eslint-disable-next-line es-x/no-class-instance-fields
	readonly [IS_REST] = true

	// eslint-disable-next-line es-x/no-class-instance-fields
	readonly element: S

	constructor(element: S) {
		this.element = element
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this)
	}

	[CALL]<S extends $$Schemable>(element: S): Rest<S> {
		return new Rest(element)
	}

	[Symbol.iterator](): ArrayIterator<this> {
		return [this][Symbol.iterator]()
	}
}

export function isRest<CastToType extends $$Schemable>(
	x: unknown,
): x is Rest<CastToType> {
	return (x as Rest<CastToType> | null)?.[IS_REST] ?? false
}

export const rest = new Rest(unknown)
