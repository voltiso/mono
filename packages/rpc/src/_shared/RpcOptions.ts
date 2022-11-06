// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { define } from '@voltiso/util'

import type { Serializer } from './Serializer'

export interface RpcOptions {
	serializer?: Serializer | undefined

	log: boolean
	logMaxLength: number
}

//

export const defaultRpcOptions = define<RpcOptions>().value({
	// serializer: {
	// 	serialize: JSON.stringify,
	// 	deserialize: JSON.parse,
	// },

	log: false,
	logMaxLength: Infinity,
})
