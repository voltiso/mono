// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar.types'

import type { NestedSubject } from './NestedSubject'
import { NestedSubjectImpl } from './NestedSubject'

export type ObserverDiContext = {
	schema: s.InferAndSimplifyFunction
}

export const injectCreateNestedSubject =
	(diContext: ObserverDiContext) =>
	<S extends s.Schemable>(
		options: Omit<NestedSubject.RootOptions<S>, 'diContext'>,
	): NestedSubject<S> =>
		new NestedSubjectImpl({ ...options, diContext }) as never
