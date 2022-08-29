import { lazyValue } from '@voltiso/util'
import { defaultSchemaOptions } from '~/Schema'

export const defaultUnknownOptions = lazyValue(() => defaultSchemaOptions)
