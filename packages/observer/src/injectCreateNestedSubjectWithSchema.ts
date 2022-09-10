// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '@voltiso/schemar.types'

import type { NestedSubjectWithSchemaRootOptions, ObserverDiContext } from './_'
import { NestedSubjectImpl } from './NestedSubjectImpl'
import type { NestedSubjectWithSchema } from './NestedSubjectWithSchema'

export const injectCreateNestedSubjectWithSchema =
	(diContext: ObserverDiContext) =>
	<S extends Schemable>(
		options: Omit<NestedSubjectWithSchemaRootOptions<S>, 'diContext'>,
	): NestedSubjectWithSchema<S> =>
		new NestedSubjectImpl({ ...options, diContext }) as never
