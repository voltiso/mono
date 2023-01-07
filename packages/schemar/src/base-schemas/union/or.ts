import * as t from '@voltiso/schemar.types'
import { Union } from './Union'

export function or<Ts extends t.$$Schemable[]>(...types: Ts): Union<Ts> {
	let ts = [] as t.$$Schemable[]

	for (const type of types) {
		if (t.isUnion(type)) ts = [...ts, ...type.getSchemas]
		else ts.push(type)
	}

	// $assert(ts.length >= 2)
	return new Union(ts as never) as never
}
