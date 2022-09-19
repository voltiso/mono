// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handlers } from '~/_shared'

import { Client } from './Client'
import type { ClientOptions } from './ClientOptions'

export function createClient<THandlers extends Handlers>(
	url: string,
	options: Partial<ClientOptions<THandlers>> = {},
): Client<THandlers> {
	const finalOptions: ClientOptions<THandlers> = {
		log: options.log || false,
		localHandlers: options.localHandlers
	}

	return new Client<THandlers>(url, finalOptions)
}
