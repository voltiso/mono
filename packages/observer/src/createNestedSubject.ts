// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubjectRootOptions } from './_'
import type { NestedSubject } from './NestedSubject'
import { NestedSubjectImpl } from './NestedSubjectImpl'

// eslint-disable-next-line etc/no-misused-generics
export const createNestedSubject = <T>(
	options: NestedSubjectRootOptions,
): NestedSubject<T> => new NestedSubjectImpl(options) as never
