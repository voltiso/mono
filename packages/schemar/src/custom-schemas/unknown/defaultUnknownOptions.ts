// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/defaultSchemaOptions'

export const defaultUnknownOptions = lazyValue(() => defaultSchemaOptions)
