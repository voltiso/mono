// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { VPartial } from '@voltiso/util'

import type { Props } from '~/react-types'

export interface IMapProps {
	(outerProps: any): Props
}

export interface MapProps<OP extends Props, IP extends Props> {
	(outerProps: OP): VPartial<IP>
}
