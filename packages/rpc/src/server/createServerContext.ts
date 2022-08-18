// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Express from 'express'

import { ServerContext } from './ServerContext'

export function createServerContext<
	// eslint-disable-next-line etc/no-misused-generics
	Request = Express.Request,
	// eslint-disable-next-line etc/no-misused-generics
	Response = Express.Response,
>() {
	return new ServerContext<Request, Response>()
}
