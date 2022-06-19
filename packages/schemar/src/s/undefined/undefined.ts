import { lazyValue } from '@voltiso/ts-util'
import * as s from '..'

const undefined_ = lazyValue(() => s.literal(undefined))
export { undefined_ as undefined }
