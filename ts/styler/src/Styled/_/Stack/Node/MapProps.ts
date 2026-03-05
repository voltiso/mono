// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Props } from '~/react-types'

export interface IMapProps {
	// biome-ignore lint/style/useShorthandFunctionType: .
	(outerProps: any): Props
}

export interface MapProps<OP extends Props, IP extends Props> {
	// biome-ignore lint/style/useShorthandFunctionType: .
	(outerProps: OP): Partial<IP>
}
