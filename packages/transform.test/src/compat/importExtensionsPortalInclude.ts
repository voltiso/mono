// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface PortalContextAndComponents {
	context: string
}

export function createPortalContextAndComponents(): PortalContextAndComponents {
	const context = 'test'

	return {
		context,
	}
}
