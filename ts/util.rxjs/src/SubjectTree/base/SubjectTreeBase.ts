// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/util'

import type { ISubjectTreeBase, SubjectTreeTypeOptions } from '~'

export interface CustomSubjectTreeBase<TO extends SubjectTreeTypeOptions>
	extends ISubjectTreeBase {
	/** Replace current value */
	set(x: TO['Input']): void

	/** Patch current value (using `@voltiso/patcher`) */
	patch(x: PatchFor<TO['Input']>): void

	delete:
		| (true extends TO['IsOptional'] ? () => void : never)
		| (false extends TO['IsOptional'] ? undefined : never) // ! only enabled in optional `SubjectTree`
	// delete?: never // ! only enabled in optional `SubjectTree`
	// delete(): void // ! only enabled in optional `SubjectTree`

	get exists(): true extends TO['IsOptional']
		? boolean
		: true extends TO['IsAncestorOptional']
			? boolean
			: true

	/** ⚠️ Throws if value is not present (also see {@link maybeValue}) */
	get value(): TO['Output']

	/** Returns `undefined` if value is not present */
	get maybeValue():
		| TO['Output']
		| (true extends TO['IsOptional']
				? undefined
				: true extends TO['IsAncestorOptional']
					? undefined
					: never)
}
