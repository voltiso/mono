import { lazyValue } from '@voltiso/util'
import { defaultSchemaOptions } from '~/Schema'

export const defaultUnknownSchemaOptions = lazyValue(() => defaultSchemaOptions)
