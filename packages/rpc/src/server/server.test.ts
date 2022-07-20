// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Server, ServerTI } from './server.js'

describe('rpc-server', () => {
	it('static checks', () => {
		expect.assertions(0)

		Assert.is<
			Server<ServerTI & { request: { a: 1 }; response: { a: 1 } }>,
			Server
		>()
	})
})
