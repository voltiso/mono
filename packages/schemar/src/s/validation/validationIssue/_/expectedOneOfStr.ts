import { toString } from '@voltiso/ts-util/string'

export function expectedOneOfStr(x: unknown[]) {
	if (x.length === 1) return toString(x[0])
	else return `one of [${x.map(x => toString(x)).join(', ')}]`
}
