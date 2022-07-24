// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { dump as yamlDump } from 'js-yaml'

interface JSONable {
	toJSON: () => unknown
}

function isJSONable(x: unknown): x is JSONable {
	return typeof (x as JSONable | null)?.toJSON === 'function'
}

export function dump(o: unknown) {
	return yamlDump(o, {
		skipInvalid: true,

		replacer: (_k, v: unknown) => {
			if (isJSONable(v)) return v.toJSON()
			else return v
		},
	})
}
