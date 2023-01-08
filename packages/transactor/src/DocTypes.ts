// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitSignatures } from '@voltiso/util'

import type { DocTypes } from '~/DocTypes-module-augmentation'

export type DocTagLike = string // | AnyDoc

export type DocTag = Exclude<keyof OmitSignatures<DocTypes>, symbol> // | AnyDoc

export const AnyDoc = Symbol('AnyDoc')
export type AnyDoc = typeof AnyDoc
