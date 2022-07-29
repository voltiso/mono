// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	ISchema,
	MergeSchemaOptions,
	PARTIAL_OPTIONS,
} from '~'

export type DefinePartialSchemaOptions<
	S extends ISchema,
	O extends Partial<S[BASE_OPTIONS]>,
> = Assume<Partial<S[BASE_OPTIONS]>, MergeSchemaOptions<S[PARTIAL_OPTIONS], O>>
