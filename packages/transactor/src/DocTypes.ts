// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitSignatures } from '@voltiso/util'
import { BrandedSymbol } from '@voltiso/util'

import type { DocTypes } from '~/DocTypes-module-augmentation'

export type DocTagLike = string // | AnyDoc

export type DocTag = Exclude<keyof OmitSignatures<DocTypes>, symbol> // | AnyDoc

/**
 * Real unique symbols conflicted with `@voltiso/transform/inline` - resulted in
 * hard-to-handle type queries (`typeof`)
 */
export const AnyDoc = BrandedSymbol('AnyDoc') // Symbol('AnyDoc')
export type AnyDoc = typeof AnyDoc

/**
 * This does not work correctly with exports - private names are not exported
 * (`.symbol` field)
 */
// export type AnyDoc = { readonly symbol: unique symbol }['symbol']
// export const AnyDoc: AnyDoc = Symbol('AnyDoc') as never
