// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import { BoundCallable, CALL } from '@voltiso/util'

import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { Unknown, Unknown$ } from '../unknown/Unknown'
import { unknown } from '../unknown/Unknown'

export type __hack_Rest = Unknown$

export interface UnknownRest extends Rest<Unknown> {
	readonly element: Unknown
	<S extends $$Schemable>(element: S): Rest<S>
}

// !

declare global {
	namespace Voltiso {
		namespace Schemar {
			const IS_REST: unique symbol
			type IS_REST = typeof IS_REST
			// type IS_REST = { readonly _: unique symbol }['_']
			// const IS_REST: IS_REST
		}
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
Voltiso.Schemar ??= /* @__PURE__ */ {} as never
;(Voltiso.Schemar.IS_REST as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/schemar/IS_REST',
)
export type IS_REST = Voltiso.Schemar.IS_REST
export const IS_REST: IS_REST = /* @__PURE__ */ Voltiso.Schemar.IS_REST

// !
// biome-ignore lint/correctness/noUnusedVariables: .
export interface Rest<S extends $$Schemable> {
	<S extends $$Schemable>(element: S): Rest<S>
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class Rest<S extends $$Schemable = $$Schemable> {
	readonly [Voltiso.Schemar.IS_REST] = true

	readonly element: S

	constructor(element: S) {
		this.element = element

		// biome-ignore lint/correctness/noConstructorReturn: hacky hacky
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
