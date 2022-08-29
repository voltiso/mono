// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { InstanceImpl } from '~'

export type Instance<Inst extends object> = t.Instance<Inst>
export const Instance = lazyConstructor(
	() => InstanceImpl,
) as unknown as t.InstanceConstructor

//

export function instance<Inst extends object>(
	Constructor: new (...args: any[]) => Inst,
) {
	$assert(Constructor)
	return new Instance(Constructor)
}
