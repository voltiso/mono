// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitSignatures } from '@voltiso/util'

import type { DocTypes } from '~/DocTypes-module-augmentation'

export type DocTagLike = string // | AnyDocTag

export type DocTag = keyof OmitSignatures<DocTypes> // | AnyDocTag

export const AnyDocTag = Symbol('AnyDocTag')
export type AnyDocTag = typeof AnyDocTag
