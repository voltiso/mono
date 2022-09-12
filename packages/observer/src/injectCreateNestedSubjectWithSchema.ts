// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '@voltiso/schemar.types'

import type { NestedSubjectWithSchemaRootOptions, ObserverDiContext } from './_'
import type { NestedSubjectWithSchema } from './_/NestedSubjectWithSchema'
import { NestedSubjectImpl } from './NestedSubjectImpl'

export const injectCreateNestedSubjectWithSchema =
	(diContext: ObserverDiContext) =>
	<S extends Schemable>(
		options: Omit<NestedSubjectWithSchemaRootOptions<S>, 'diContext'>,
	): NestedSubjectWithSchema<S> =>
		new NestedSubjectImpl({ ...options, diContext }) as never
