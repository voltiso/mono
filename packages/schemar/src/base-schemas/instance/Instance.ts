// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { $assert, lazyConstructor } from '@voltiso/util'

import { InstanceImpl } from './InstanceImpl'

export type Instance<Inst extends object> = t.Instance<Inst>
export const Instance = lazyConstructor(
	() => InstanceImpl,
) as unknown as t.InstanceConstructor

//

export function instance<TInstance extends object>(
	Constructor: abstract new (...args: any) => TInstance,
) {
	$assert(Constructor)
	return new Instance(Constructor)
}
