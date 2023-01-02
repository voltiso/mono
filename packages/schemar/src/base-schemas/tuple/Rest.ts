// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { BoundCallable, CALL } from '@voltiso/util'

import { unknown } from '../unknown/Unknown'

export interface Rest<S extends t.$$Schemable> {
	<S extends t.$$Schemable>(element: S): Rest<S>
}

export const IS_REST = Symbol('IS_REST')

export class Rest<S extends t.$$Schemable> {
	readonly [IS_REST] = true

	readonly element: S

	constructor(element: S) {
		this.element = element
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this)
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<S extends t.$$Schemable>(element: S) {
		return new Rest(element)
	}

	[Symbol.iterator]() {
		return [this][Symbol.iterator]()
	}

	// // eslint-disable-next-line class-methods-use-this
	// get length() {
	// 	return 1
	// }
}

export function isRest<CastToType extends t.$$Schemable>(
	x: unknown,
): x is Rest<CastToType> {
	// eslint-disable-next-line security/detect-object-injection
	return (x as Rest<CastToType> | null)?.[IS_REST] ?? false
}

export const rest = new Rest(unknown)
