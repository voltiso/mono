// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from '~/Doc'

export type InferMethods<Inst> = Inst extends unknown
	? {
			[k in Exclude<keyof Inst, keyof IDoc> as Inst[k] extends (
				...args: never[]
			) => Promise<unknown>
				? k
				: never]: Inst[k]
	  }
	: never
