// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createPortalContext } from './createPortalContext'
import { createPortalDestination } from './createPortalDestination'
import { createPortalSource } from './createPortalSource'
import type { PortalContext } from './PortalContext'
import type { PortalDestination } from './PortalDestination'
import type { PortalSource } from './PortalSource'

export type PortalContextAndComponents = {
	context: PortalContext
	Source: PortalSource
	Destination: PortalDestination
}

export function createPortalContextAndComponents(): PortalContextAndComponents {
	const context = createPortalContext()
	const Source = createPortalSource(context)
	const Destination = createPortalDestination(context)

	return {
		context,
		Source,
		Destination,
	}
}
