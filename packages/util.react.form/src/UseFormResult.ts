// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedObservable } from '@voltiso/observer'
import type { ValidationIssue } from '@voltiso/schemar'
import type {
	GetShape,
	SchemableLike,
	SchemableObjectLike,
	SchemableWithShape,
} from '@voltiso/schemar.types'
import type { DOMAttributes } from 'react'

export type UseFormResultFields<S extends SchemableLike> =
	S extends SchemableWithShape
		? {
				[k in keyof GetShape<S>]: UseFormResultFields<GetShape<S>[k]>
		  }
		: {
				props: {
					onChange: Exclude<
						DOMAttributes<HTMLInputElement>['onChange'],
						undefined
					>
				}

				issues: ValidationIssue[]
		  }

export type UseFormResult<S extends SchemableObjectLike> = NestedObservable<
	{
		props: {
			onSubmit: Exclude<DOMAttributes<HTMLFormElement>['onSubmit'], undefined>
		}
	} & UseFormResultFields<S>
>
