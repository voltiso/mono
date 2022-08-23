// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $_ } from '@voltiso/util'

export type MergeSchemaOptions<A, B> = $_<
	Required<B> & Pick<A, Exclude<keyof A, keyof B>>
>
