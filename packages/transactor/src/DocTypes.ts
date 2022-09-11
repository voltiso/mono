// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitSignatures } from '@voltiso/util'

import type { IDoc } from './Doc'
import type { DocTypes } from './DocTypes-module-augmentation'

export type DocTag = keyof OmitSignatures<DocTypes>

export type DocType = Extract<DocTypes[keyof DocTypes], IDoc>

export type DocFromTag<Tag extends DocTag> = DocTypes[Tag]
