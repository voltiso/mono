// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { setProperty } from '../get-set'
import { getEntries } from '../key-value'

type Mapping<Obj extends object> = {
	[key in keyof Obj]: (value: Obj[key]) => Obj[key]
}[keyof Obj]

export function mapValues<Obj extends object, M extends Mapping<Obj>>(
	obj: Obj,
	mapping: M,
): Obj {
	const result = {} as Obj

	for (const [key, value] of getEntries(obj)) {
		setProperty(result, key, mapping(value) as never)
	}

	return result
}
