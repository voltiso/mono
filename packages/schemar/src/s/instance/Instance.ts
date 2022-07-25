// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type { Merge2Simple } from '@voltiso/util'

import type { DefaultInstanceOptions } from './_/InstanceOptions.js'
import type { CustomInstance } from './CustomInstance.js'
import { Instance_ } from './Instance_.js'

export type Instance<Inst extends object> = CustomInstance<
	Merge2Simple<
		DefaultInstanceOptions,
		{
			constructor: abstract new (...args: never[]) => Inst
			_out: Inst
			_in: Inst
		}
	>
>

export const Instance = Instance_ as unknown as InstanceConstructor

type InstanceConstructor = new <Inst extends object>(
	Constructor: abstract new (...args: never[]) => Inst,
) => Instance<Inst>

//

export function instance<Inst extends object>(
	Constructor: new (...args: never[]) => Inst,
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
