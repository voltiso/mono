// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Handlers } from '~/_shared'

import type { Request, Response } from '.'
import type { Server } from './server'

describe('rpc-server', () => {
	it('generic', <Req extends Request, Res extends Response, H extends Handlers>() => {
		expect.assertions(0)

		Assert.is<Server<Req, Res, H>, Server>()
	})
})
