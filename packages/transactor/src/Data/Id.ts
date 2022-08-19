// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Tagged } from '@voltiso/util'

import type { DocLike, DTI, IDoc } from '~/Doc'

export type Id<D extends DocLike = IDoc> = string &
	(IDoc extends D ? unknown : Tagged<'Doc' & { tag: D[DTI]['tag'] }>)
// (IDoc extends D ? unknown : Tagged<'Doc' & Relax<D[DTI]>>)
