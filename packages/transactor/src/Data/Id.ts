// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Tagged } from '@voltiso/util'

import type { $$Doc, DTI, IDoc } from '~/Doc'

export type Id<D extends $$Doc = IDoc> = D extends IDoc
	? string & (IDoc extends D ? unknown : Tagged<'Doc' & { tag: D[DTI]['tag'] }>)
	: never
