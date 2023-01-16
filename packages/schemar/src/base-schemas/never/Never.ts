// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomNever, CustomNever$ } from '~'
import { CustomNeverImpl } from '~'

export interface Never extends CustomNever<{}> {}

export interface Never$ extends CustomNever$<{}> {
	get Final(): Never
}

export const Never$ = lazyConstructor(
	() => CustomNeverImpl,
) as unknown as Never$Constructor

//

export type Never$Constructor = new () => Never$

//

export const never = lazyValue(() => new Never$())
