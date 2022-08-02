// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { VPartial } from '@voltiso/util'

import type {
	IndexedCssProps,
	IndexedCssPropsSingle,
} from '~/_/CssProps/IndexedCssProps'
import type { Props } from '~/react-types'
import type { IStylable } from '~/Stylable'
import type { IStack } from '~/Styled/_/Stack'

export interface IStyledData {
	element: IStylable | null

	stack: IStack

	defaults: VPartial<Props>
	domDefaults: VPartial<Props>

	cssProps: IndexedCssProps
}

export type IStyledDataMod = VPartial<{
	element: IStylable | null

	stack: IStack

	defaults: VPartial<Props>
	domDefaults: VPartial<Props>

	cssProps: IndexedCssProps | IndexedCssPropsSingle
}>
