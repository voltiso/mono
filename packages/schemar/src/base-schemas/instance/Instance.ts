// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert, lazyConstructor } from '@voltiso/util'

import type { CustomInstance } from '~'

import { InstanceImpl } from './InstanceImpl'

export type Instance<Inst extends object> = CustomInstance<{
	constructor: abstract new (...args: any) => Inst
	Output: Inst
	Input: Inst
}>

export const Instance = lazyConstructor(
	() => InstanceImpl,
) as unknown as InstanceConstructor

//

export type UnknownInstance = <Inst extends object>(
	constructor: abstract new (...args: any) => Inst,
) => Instance<Inst>

//

export type InstanceConstructor = new <Inst extends object>(
	Constructor: abstract new (...args: any[]) => Inst,
) => Instance<Inst>

//

export function instance<TInstance extends object>(
	Constructor: abstract new (...args: any) => TInstance,
) {
	$assert(Constructor)
	return new Instance(Constructor)
}
