// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Doc } from '~/Doc'

export type InferMethods<Inst> = Inst extends unknown
	? {
			[k in Exclude<keyof Inst, keyof Doc> as Inst[k] extends (
				...args: never[]
			) => Promise<unknown>
				? k
				: never]: Inst[k]
		}
	: never
