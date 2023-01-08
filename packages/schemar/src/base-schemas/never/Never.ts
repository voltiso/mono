// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomNever } from '~'
import { CustomNeverImpl } from '~'

export type Never = CustomNever<{}>

export const Never = lazyConstructor(
	() => CustomNeverImpl,
) as unknown as NeverConstructor

//

export type NeverConstructor = new () => Never

//

export const never = lazyValue(() => new Never())
