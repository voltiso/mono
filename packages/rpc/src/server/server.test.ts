// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { Handlers } from '~/_shared'

import type { RpcRequest } from './RpcRequest'
import type { RpcResponse } from './RpcResponse'
import type { RpcServer } from './RpcServer'

describe('rpc-server', () => {
	it('generic', <Req extends RpcRequest, Res extends RpcResponse, H extends
		Handlers>() => {
		expect.assertions(0)

		$Assert.is<RpcServer<H, Req, Res>, RpcServer>()
	})
})
