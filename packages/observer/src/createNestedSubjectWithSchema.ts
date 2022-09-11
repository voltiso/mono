// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { SchemableObjectLike } from '@voltiso/schemar.types'

import type { NestedSubjectWithSchemaRootOptions } from './_'
import { NestedSubjectImpl } from './NestedSubjectImpl'
import type { NestedSubjectWithSchema } from './NestedSubjectWithSchema'

export const createNestedSubjectWithSchema = <S extends SchemableObjectLike>(
	options: Omit<NestedSubjectWithSchemaRootOptions<S>, 'diContext'>,
): NestedSubjectWithSchema<S> =>
	new NestedSubjectImpl({
		diContext: { schema: s.schema },
		...options,
	}) as never
