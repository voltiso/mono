// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handlers } from '~/_shared'

import { Client } from './Client'
import type { ClientOptions } from './ClientOptions'

// eslint-disable-next-line etc/no-misused-generics
export function createClient<THandlers extends Handlers>(
	url: string,
	options: Partial<ClientOptions> = {},
) {
	const finalOptions = {
		log: options.log || false,
	}

	return new Client<THandlers>(url, finalOptions)
}
