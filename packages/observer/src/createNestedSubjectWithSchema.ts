// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { SchemableObjectLike, Type_ } from '@voltiso/schemar.types'

import type { NestedSubjectWithSchemaRootOptions } from './_'
import type { NestedSubject } from './NestedSubject'
import { NestedSubjectImpl } from './NestedSubjectImpl'

export const createNestedSubjectWithSchema = <S extends SchemableObjectLike>(
	options: Omit<NestedSubjectWithSchemaRootOptions<S>, 'diContext'>,
): NestedSubject<Type_<S>> =>
	new NestedSubjectImpl({
		diContext: { schema: s.schema },
		...options,
	}) as never
