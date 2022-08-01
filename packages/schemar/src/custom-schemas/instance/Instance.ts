// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { lazyConstructor } from '@voltiso/util'

import type { CustomInstance } from '~'
import { InstanceImpl } from '~'

export type Instance<Inst extends object> = CustomInstance<{
	constructor: abstract new (...args: any[]) => Inst
	Output: Inst
	Input: Inst
}>

export const Instance = lazyConstructor(
	() => InstanceImpl,
) as unknown as InstanceConstructor

type InstanceConstructor = new <Inst extends object>(
	Constructor: abstract new (...args: any[]) => Inst,
) => Instance<Inst>

//

export function instance<Inst extends object>(
	Constructor: new (...args: any[]) => Inst,
) {
	assert(Constructor)
	return new Instance(Constructor)
}

// type GetConstructor<Inst extends object = object> = {
// 	getConstructor: () => new (...args: never[]) => Inst
// }

// function isGetConstructor(x: unknown): x is GetConstructor {
// 	return typeof (x as GetConstructor | null)?.getConstructor === 'function'
// }

// export function instance<Inst extends object>(
// 	Constructor: new (...args: never[]) => Inst,
// ): Instance<Inst>

// export function instance<Inst extends object>(
// 	arg: GetConstructor<Inst>,
// ): Instance<Inst>

// export function instance<Inst extends object>(
// 	arg: (new (...args: never[]) => Inst) | GetConstructor<Inst>,
// ): Instance<Inst> {
// 	const Constructor = isGetConstructor(arg) ? arg.getConstructor() : arg
// 	return new Instance(Constructor)
// }
