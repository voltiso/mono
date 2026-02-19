// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable es-x/no-global-this */

import type { Brands, CustomBrand_, PropertyPath } from '@voltiso/util'

import type { DocTag } from '~/DocTypes'
import type { TransactorConfig } from '~/TransactorConfig-augmentation'

declare global {
	namespace Voltiso {
		namespace Transactor {
			const TRANSACTOR: unique symbol
			type TRANSACTOR = typeof TRANSACTOR
			// type TRANSACTOR = { readonly _: unique symbol }['_']
			// const TRANSACTOR: TRANSACTOR
		}
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
Voltiso.Transactor ??= /* @__PURE__ */ {} as never
;(Voltiso.Transactor.TRANSACTOR as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/transactor/TRANSACTOR',
)
export type TRANSACTOR = Voltiso.Transactor.TRANSACTOR
export const TRANSACTOR: TRANSACTOR =
	/* @__PURE__ */ Voltiso.Transactor.TRANSACTOR

declare module '@voltiso/util' {
	interface Brands {
		[TRANSACTOR]: {
			/** Mark things as related to a specific Doc type (by DogTag) */
			doc: { [k in DocTag]?: {} }

			/** Mark strings as database IDs */
			id: {}
		}
	}
}

export interface TransactorBrand<
	path extends
		| PropertyPath.ForObject<Brands[TRANSACTOR]>
		| []
		| keyof Brands[TRANSACTOR] = [],
	detail = {},
> extends TransactorBrand.ForPath<
	path extends keyof Brands[TRANSACTOR]
		? [path]
		: path extends PropertyPath.ForObject<Brands[TRANSACTOR]> | []
			? path
			: never,
	detail
> {}

export namespace TransactorBrand {
	export type ForPath<
		path extends PropertyPath.ForObject<Brands[TRANSACTOR]> | [],
		detail = {},
	> = TransactorConfig extends { disableBranding: true }
		? {}
		: CustomBrand_<[TRANSACTOR, ...path], detail>
}
