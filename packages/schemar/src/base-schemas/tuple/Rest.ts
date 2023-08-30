// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { BoundCallable, CALL } from '@voltiso/util'

import type { $$Schemable } from '~'

import type { Unknown } from '../unknown/Unknown'
import { unknown } from '../unknown/Unknown'

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
	readonly [IS_REST] = true

	readonly element: S

	constructor(element: S) {
		this.element = element
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this)
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<S extends $$Schemable>(element: S) {
		return new Rest(element)
	}

	[Symbol.iterator]() {
		return [this][Symbol.iterator]()
	}
}

export function isRest<CastToType extends $$Schemable>(
	x: unknown,
): x is Rest<CastToType> {
	return (x as Rest<CastToType> | null)?.[IS_REST] ?? false
}

export const rest = new Rest(unknown)
