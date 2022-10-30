// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { $$SchemableObject } from '@voltiso/schemar.types'

import type { NestedSubjectWithSchemaRootOptions } from './_'
import type { NestedSubjectWithSchema } from './_/NestedSubjectWithSchema'
import { NestedSubjectImpl } from './NestedSubjectImpl'

export const createNestedSubjectWithSchema = <S extends $$SchemableObject>(
	options: Omit<NestedSubjectWithSchemaRootOptions<S>, 'diContext'>,
): NestedSubjectWithSchema<S> =>
	new NestedSubjectImpl({
		diContext: { schema: s.schema },
		...options,
	}) as never
