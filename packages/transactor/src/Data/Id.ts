// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Tagged } from '@voltiso/util'

import type { DTI, IDoc } from '../Doc'
import type { Relax } from '../Relax'

export type Id<D extends IDoc = IDoc> = string &
	(IDoc extends D ? unknown : Tagged<'Doc' & Relax<D[DTI]>>)
